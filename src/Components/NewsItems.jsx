import React from 'react'

const NewsItems=(props)=> {
  

    let {title, publishedAt, author, description, imgUrl, newsUrl, source }=props;
    

    return (
      <div className='my-3'>
      <div className="card">
    <img src={imgUrl} className="card-img-top" alt="..."/>
    <div className="card-body">
    <span className="badge text-bg-info">{source}</span>
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-body-secondary">Last updated on {new Date(publishedAt).toDateString()}, {new Date(publishedAt).toLocaleTimeString()} by {author===null ? 'Unknown' : author }</small></p>
    <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-primary btn-sm">Read more..</a>
  </div>
</div>
      </div>
    )
  
}

export default NewsItems;