import React, { Component } from 'react';
import NYTUpdate from './NYTUpdate';

class NYTNews extends Component {
  state = {
    articles: [],
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchNYTNews();
  }

  fetchNYTNews = () => {
    const apiKey = 'HRGYlTGgLrcCZWGhrEX3iENS9c8GsnZF'; // Your actual API key
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`;
  
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch NYT News');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          articles: data.results, // Assuming the API returns the articles under 'results'
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
                <h2 className='text-center'>NYT NEWS HEADLINES</h2>
                <div className='row'>
                    {this.state.articles.map((element) => (
                        <div className="col-md-4" key={element.url}>
                            <NYTUpdate
                                title={element.title}
                                newsUrl={element.url}
                                description={element.description ? element.description.slice(0, 100) : null}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
}
export default NYTNews;