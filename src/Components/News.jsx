import React, { useState, useEffect } from 'react'
import NewsItems from './NewsItems'
import Navbar from './Navbar';
import Spinner from './Spinner';
import nullImg from './images/null.png'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



const News =(props)=> {
  
 
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [search, setSearch]=useState('')
  const [language, setLanguage]=useState('en')

  const newApi=`https://newsdata.io/api/1/news?apikey=pub_22588fb3ea8bd66402557e392eff70558d063&country=${props.country}&category=${props.category}&language=${language}`

const updateNews= async ()=>{
    props.setProgress(10);
    /*const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;*/
    setLoading(true);
    let data=await fetch(newApi);
    props.setProgress(30);
    let parsedData=await data.json()
    props.setProgress(70);
    setArticles(parsedData.results)
   // setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
    
  }



  useEffect(()=>{
    document.title='News_'+props.category.toUpperCase()
    updateNews();
  },[])

 /* Issue: Whenever we are fetching the new News by running the fetch more Date function, then the "setPage" is taking some time to set the page value, which means taking extra time in rendering the page while scrolling. This issue occurs as the "setPage" is an asynchronous function.*/

 /*Solution: To solve this issue we would add "page+", that is set page by incrementing the value, in the url. This is so because the url is being fetched before the set page.*/

  const fetchMoreData =async () => {
    /*const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;*/
    setPage(page+1)
    let data=await fetch(newApi);
    let parsedData=await data.json()
    //setArticles(articles.concat(parsedData.articles))
    setArticles(articles.concat(parsedData.results))
    setTotalResults(parsedData.totalResults)
    console.log(parsedData.nextPage)
    
  };



const getSearch=(e)=>{
  setSearch(e.target.value)
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



  
    return (
      <>
      <Navbar onChange={getSearch} language={language}/>
      <div className='container' style={{marginTop:'70px'}}>
         <h2>Top Headlines</h2>
        <div className="card-header">{(props.category).toUpperCase()}</div>
      
      <div className='my-3'>
         {loading && <Spinner/>} 
         </div>
        <InfiniteScroll
        style={{height:'none', overflow:'none'}}
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
        <div className='row '>
        { articles
        .filter((element)=>{
          return search.toLowerCase() === '' ? element : element.title.toLowerCase().includes(search);
        })
        .map((element,index)=>{
          return (<div className='col-md-3 mx-auto' key={element.link} /*key={element.url}*/>
            <NewsItems title={element.title.length >= 45 ? element.title.slice(0, 45) : element.title} publishedAt={element.pubDate} /*publishedAt={element.publishedAt} author={element.author}source={element.source_id}source={element.source.name}*/
            description={element.description !== null && element.title.length >= 45 ? element.description.slice(0, 60) : element.description} /*imgUrl={element.urlToImage === null ? NoImage:element.urlToImage} newsUrl={element.url}*/imgUrl={element.image_url === null ? nullImg:element.image_url} newsUrl={element.link}/>
            </div>)
          })
        } 
        </div>
        </div>
        </InfiniteScroll>
        
        {/* <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handelPrevClick}>Previous</button>
        <button disabled={this.state.page + 1 > Math.round(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handelNextClick}>Next</button>
        </div> */}
      </div>
      </>
    )
  
}

 News.defaultProps={
  country: 'in',
  pageSize: 10,
  category: 'general' 
}


 News.propTypes={
  country: PropTypes.string,
  pageSize:PropTypes.number,
  category: PropTypes.string
}


export default News;