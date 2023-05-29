import React, { useState, useEffect } from 'react'
import NewsItems from './NewsItems';
import Navbar from './Navbar';
import Spinner from './Spinner';
import nullImg from './images/null.png';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

/*fetch(`https://newsdata.io/api/1/news?apikey=pub_2363751d261c8b6fde91b93784d9d5a7c08ad&country=in&category=top&language=en`)
      .then((response) => response.json())
      .then((apiData) => {
         console.log(apiData);*/

const News =(props)=> {
  
  const [newsArr, setNewsArr] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [search, setSearch]=useState('');
  const [language, setLanguage]=useState('en');


  const handleChange = async(e) => {
    setLanguage(e.target.value);
    updateNews();
  };

const updateNews= async ()=>{
    let url=`https://newsdata.io/api/1/news?apikey=${props.apiKey}&country=${props.country}&category=${props.category}&language=${language}`
    props.setProgress(10);
    setLoading(true);
    let data=await fetch(url);
    props.setProgress(30);
    let parsedData=await data.json()
    props.setProgress(70);
    setArticles(parsedData.results)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
    console.log('updateNews','articles',articles)
    
  }


 useEffect((e)=>{
    updateNews()
    // eslint-disable-next-line
  },[])

  
  const fetchMoreData =async () => {
    const apiLink=`https://newsdata.io/api/1/news?apikey=${props.apiKey}&country=${props.country}&category=${props.category}&language=${language}`
    let data=await fetch(apiLink);
    let parsedData=await data.json()
    const api=`https://newsdata.io/api/1/news?apikey=${props.apiKey}&country=${props.country}&category=${props.category}&language=${language}&page=${parsedData.nextPage}`
    let UpdData=await fetch(api);
    let parsedUpdData=await UpdData.json()
    setArticles(articles.concat(parsedUpdData.results))
    setTotalResults(parsedUpdData.totalResults)

    console.log('fetchMoreData','articles',articles)
    //console.log('updateNews','newsList',newsList)
  };

const searchVal=(e)=>{
  setSearch(e.target.value);
  
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
      <Navbar onChange={searchVal} onLanguageChange={handleChange} language={language} length={articles.length}/>
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
        
        { 
        articles.length >= 10 && articles
        .filter((element)=>{
          return search.toLowerCase() === '' ? element : element.title.toLowerCase().includes(search);
        })
        .map((element,index)=>{
          return (<div className='col-md-3 mx-auto' key={index} length={articles.length}>
            <NewsItems title={element.title.length >= 45 ? element.title.slice(0, 45) : element.title} publishedAt={element.pubDate} 
            author={element.author}source={element.source_id}
            description={element.description !== null && element.title.length >= 45 ? element.description.slice(0, 60) : element.description} imgUrl={element.image_url === null ? nullImg:element.image_url} newsUrl={element.link}/>
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