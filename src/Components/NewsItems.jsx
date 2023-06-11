import React from 'react'

const NewsItems=(props,c)=> {
  document.body.style.backgroundColor === 'gray' ? c='dark':c='light'

    let {title, publishedAt, creator, description, imgUrl, newsUrl, source}=props;
   

    return (
      <div className='my-3'>
      <div className={`card text-bg-${c}`} >
    <img src={imgUrl} className="card-img-top" alt="..." title={imgUrl==='/static/media/null.122b7687ee59444ae10b.png'?'image not available':imgUrl}/>
    <div className="card-body">
    <span className={`badge text-bg-${c==='dark'?'primary':'info'}`}>{source}</span>      
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className={`text-body-${c==='dark'?'light':'secondary'}`}>Last updated on {new Date(publishedAt).toDateString()}, {new Date(publishedAt).toLocaleTimeString()} by {creator} </small></p>
    <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-primary btn-sm">Read more..</a>
  </div>
</div>
      </div>
    )
 
}

export default NewsItems;

