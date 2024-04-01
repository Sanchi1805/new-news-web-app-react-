import React, { Component } from 'react';
import BBCUpdate from './BBCUpdate';

class BBCNews extends Component {
  state = {
    articles: [],
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchBBCNews();
  }

  fetchBBCNews = () => {
    fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=743363752fe74ab5bb627119c72456a9')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch BBC News');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          isLoading: false,
          error: null,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          error: error.message,
        });
      });
  };

  render() {
    return (
        <div className='container my-3'>
            <div className='news-container'>
                <h2 className='text-center'>BBC NEWS HEADLINES</h2>
                <div className='row'>
                    {this.state.articles.map((element) => (
                        <div className="col-md-4" key={element.url}>
                            <BBCUpdate
                                title={element.title}
                                newsUrl={element.url}
                                description={element.description ? element.description.slice(0, 100) : null}
                                imageUrl={element.urlToImage}
                                source={element.source.name} aouthor={element.aouthor}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
}
export default BBCNews;