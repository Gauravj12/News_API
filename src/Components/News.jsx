import React, { useState, useEffect } from 'react'
import NewsItems from './NewsItems';
import Navbar from './Navbar';
import Spinner from './Spinner';
import nullImg from './images/null.png';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';



const News =(props)=> {
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [search, setSearch]=useState('');
  const [language, setLanguage]=useState('en');


  useEffect(()=>{
    language==='hi' ? updateNews() : updateNews()
    //eslint-disable-next-line
    },[language])


  const handleChange = async(e) => {
    setLanguage(e.target.value);
    
  };

const updateNews= async ()=>{
    let url=`https://newsdata.io/api/1/news?apikey=${props.apiKey}&country=${props.country}&category=${props.category}&language=${language}&q=${search}`
    props.setProgress(10);
    setLoading(true);
    let data=await fetch(url);
    props.setProgress(30);
    let parsedData=await data.json()
    props.setProgress(70);
    setArticles(parsedData.results)
    setPage(parsedData.nextPage)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }


  
  const fetchMoreData =async () => {
    const api=`https://newsdata.io/api/1/news?apikey=${props.apiKey}&country=${props.country}&category=${props.category}&language=${language}&q=${search}&page=${page}`
    let UpdData=await fetch(api);
    let parsedUpdData=await UpdData.json()
    setPage(parsedUpdData.nextPage)
    setArticles(articles.concat(parsedUpdData.results))
    setTotalResults(parsedUpdData.totalResults)
  };

const searchVal=(e)=>{
  setSearch(e.target.value);
  
}

const searchNews=(e)=>{
  e.preventDefault()
  search !== '' ? updateNews() : updateNews()
}



    return (
      <>
      <Navbar onChange={searchVal} onclick={searchNews} onLanguageChange={handleChange} page={page} length={articles.length}/>
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
        articles
        /*.filter((element)=>{   // Functionality of Filter
          return search.toLowerCase() === '' ? element : element.title.toLowerCase().includes(search);
        })*/
        .map((element,index)=>{
          return (<div className='col-md-3 mx-auto' key={index} length={articles.length}>
            <NewsItems title={element.title.length >= 45 ? element.title.slice(0, 45) : element.title} 
            publishedAt={element.pubDate} source={element.source_id} 
            creator={element.creator===null ? 'NA' :element.creator}
            description={element.description=== null ? 'Description not available...' : element.description.slice(0,100)} 
            imgUrl={element.image_url === null ? nullImg:element.image_url} newsUrl={element.link}/>
            </div>)
          })
        }  
        
        </div>
        </div>
         </InfiniteScroll> 
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