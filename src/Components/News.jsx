import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import NoImage from './images/404_img.jpg'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export default class News extends Component {

  static defaultProps={
    country: 'in',
    pageSize: 10,
    category: 'general' 
  }

  static propTypes={
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string
  }
  
  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:true,
      page:1, 
      totalResults:0,
    }
    document.title='News_'+this.props.category.toUpperCase()
  }


  updateNews= async ()=>{
    this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    this.props.setProgress(30);
    let parsedData=await data.json()
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false
    })
    this.props.setProgress(100);
  }

 /* Issue: Whenever we are fetching the new News by running the fetch more Date function, then the "setPage" is taking some time to set the page value, which means taking extra time in rendering the page while scrolling. This issue occurs as the "setPage" is an asynchronous function.*/

 /*Solution: To solve this issue we would add "page+", that is set page by incrementing the value, in the url. This is so because the url is being fetched before the set page.*/

  fetchMoreData =async () => {
    this.setState({page: this.state.page + 1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  
    let data=await fetch(url);
    let parsedData=await data.json()
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
        
      });
    
  };


  async componentDidMount(){
    this.updateNews();
  }


 /* handelPrevClick= async ()=>{
   this.setState({page:this.state.page})    
   this.updateNews();
}


  handelNextClick=async()=>{
    this.setState({page:this.state.page+1})  
    this.updateNews();
    console.log('page',this.state.page)
    
    
}*/


  render() {
    return (
      <div className='container' style={{marginTop:'70px'}}>
        <h2>Top Headlines</h2>
        <div className="card-header">{(this.props.category).toUpperCase()}</div>
         {this.state.loading && <Spinner/>} 
        <InfiniteScroll
        style={{height:'none', overflow:'none'}}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
        <div className='row '>
        { this.state.articles.map((element,index)=>{
          return (<div className='col-md-3 mx-auto'  key={element.url}>
            <NewsItems title={element.title.length >= 45 ? element.title.slice(0, 45) : element.title} publishedAt={element.publishedAt} author={element.author} source={element.source.name}
            description={element.description !== null && element.title.length >= 45 ? element.description.slice(0, 60) : element.description} imgUrl={element.urlToImage === null ? NoImage:element.urlToImage} newsUrl={element.url}/>
            </div>)
          })} 
        </div>
        </div>
        </InfiniteScroll>
        
        {/* <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handelPrevClick}>Previous</button>
        <button disabled={this.state.page + 1 > Math.round(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handelNextClick}>Next</button>
        </div> */}
      </div>
    )
  }
}