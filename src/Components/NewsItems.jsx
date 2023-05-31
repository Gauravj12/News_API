import React from 'react'

const NewsItems=(props)=> {
  

    let {title, publishedAt, creator, description, imgUrl, newsUrl, source, keyword }=props;
    

    return (
      <div className='my-3'>
      <div className="card">
    <img src={imgUrl} className="card-img-top" alt="..." title={imgUrl==='/static/media/null.122b7687ee59444ae10b.png'?'image not available':imgUrl}/>
    <div className="card-body">
    <span className="badge text-bg-info">{source}</span>      
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-body-secondary">Last updated on {new Date(publishedAt).toDateString()}, {new Date(publishedAt).toLocaleTimeString()} by {creator} </small></p>
    <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-primary btn-sm">Read more..</a>
    <span class="badge text-bg-light float-end text-wrap">{keyword}</span>
  </div>
</div>
      </div>
    )
  
}

export default NewsItems;


