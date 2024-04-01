import React, { Component } from 'react';

class NewsUpdate extends Component {
  render() {
    const { title, description, imageUrl , newsUrl,source,author} = this.props; // Destructure props

    return (
      <div className='my-3'>
        <div className="card" style={{ width: '330px', height:'100%' }}>
          <div className='card-header bg-warning'>Source : {source}</div>
          <img src={imageUrl} className="card-img-top" alt="News" height="250px" />
          <div className="card-body">
            <h6 className="card-title">{title}</h6>
            <p className="card-text">{description}.....</p>
            <a rel="noreferrer" href={newsUrl} className="btn btn-primary">
              Read More
            </a>
          </div>
        <div className='card-footer text-success'><cite title='Source Title'>By : {!author?source:author}</cite></div>
        </div>
      </div>
    );
  }
}

export default NewsUpdate;
