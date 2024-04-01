import React, { Component } from 'react';
import NewsUpdate from './NewsUpdate';
//import Spinner from './Spinner';
import propTypes from 'prop-types';

class News extends Component {
  static propTypes = {
    category: propTypes.string.isRequired,
  };

  constructor(props) {
    super(props); // Don't forget to pass props to super
    this.state = {
      articles: [],
      page: 1,
    };
  }

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&apiKey=743363752fe74ab5bb627119c72456a9&page=${this.state.page}&pageSize=12`;
  //   const data = await fetch(url);
  //   const parsedData = await data.json();
  //   this.setState({
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // }
  async UpdateNews() {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&apiKey=743363752fe74ab5bb627119c72456a9&page=${this.state.page}&pageSize=12`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      page: this.state.page,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  async componentDidMount() {
    this.UpdateNews();
  }

    nextclick = async () => {
      this.setState({page:this.state.page + 1});
      this.UpdateNews();
    }
    previousclick = async () => {
      this.setState({page:this.state.page - 1});
      this.UpdateNews();
    }
  // nextclick = async () => {
  //   this.setState({ loading: true });
  //   const url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&apiKey=743363752fe74ab5bb627119c72456a9&page=${this.state.page + 1}&pageSize=12`;
  //   const data = await fetch(url);
  //   const parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };

  // previousclick = async () => {
  //   this.setState({ loading: true });
  //   const url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&apiKey=743363752fe74ab5bb627119c72456a9&page=${this.state.page - 1}&pageSize=12`;
  //   const data = await fetch(url);
  //   const parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };

  render() {
    return (
      <div className='container my-3'>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.previousclick}>Previous</button>
          <button type='button' className='btn btn-dark' onClick={this.nextclick}>Next</button>
        </div>
        <div className='news-container'>
          <h2 className='text-center'>TOP HEADLINES</h2>
          <div className='row'>
            {this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsUpdate
                  title={element.title}
                  newsUrl={element.url}
                  description={element.description ? element.description.slice(0, 100) : ''}
                  imageUrl={element.urlToImage} source={element.source.name} aouthor={element.aouthor}
                />
              </div>
            ))}
          </div>
          {/* {this.state.loading && <Spinner />} */}
          <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.previousclick}>Previous</button>
            <h5>Total Results : {this.state.totalResults}</h5>
            <button type='button' className='btn btn-dark' onClick={this.nextclick}>Next</button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
