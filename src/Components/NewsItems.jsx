import React, { Component } from 'react'

export default class NewsItems extends Component {
  render() {

    let {title, description, imgUrl, newsUrl }=this.props;

    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
  <img style={{ width: "286px", height: "161px", objectFit:"cover"}} src={imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-primary btn-sm">Read more..</a>
  </div>
</div>
      </div>
    )
  }
}
