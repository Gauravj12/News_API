import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';

export default class News extends Component {
  
  constructor(){
    super();
    this.state={
      articles:[],
      loading:false,
      page:1,
      
      
    }
    
  }

  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=829ea012824442d7856c700b0116d551&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData=await data.json()
    this.setState({articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading:false
    
    })
    
  }

  handelPrevClick= async ()=>{

    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=829ea012824442d7856c700b0116d551&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData=await data.json()
    this.setState({
      page:this.state.page-1,
      articles: parsedData.articles,
      loading:false
    })


  }

  handelNextClick= async ()=>{

if(!(this.state.page + 1 > Math.round(this.state.totalResults/this.props.pageSize)))
{   let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=829ea012824442d7856c700b0116d551&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json()
    
    this.setState({
      page:this.state.page+1,
      articles: parsedData.articles,
      loading:false
    })
    
}
}

  render() {
    return (
      <div className='container my-3'>
        <h2>Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className='row'>
        { !this.state.loading && this.state.articles.map((element)=>{
          return <div className='col-md-3 mx-3' key={element.url}>
            <NewsItems title={element.title.length >= 45 ? element.title.slice(0, 45) : element.title} 
            description={element.description !== null && element.title.length >= 45 ? element.description.slice(0, 60) : element.description} imgUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })} 
        </div>
        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handelPrevClick}>Previous</button>
        <button disabled={this.state.page + 1 > Math.round(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handelNextClick}>Next</button>
        </div>
      </div>
    )
  }
}
