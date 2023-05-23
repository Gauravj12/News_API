import React from 'react'
import Navbar from './Navbar'


const Home=()=> {
  return (
    <div>
    <Navbar/>
    <div className='container-fluid' style={{marginTop:'70px'}}>
    <div className="card text-center">
  <div className="card-body">
    <h5 className="card-title">News API</h5>
    <p className="card-text">News API is a simple, easy-to-use REST API that returns JSON search results for current and historic news articles published by over 80,000 worldwide sources.</p>
    <a href="https://newsapi.org/" rel="noreferrer" target='_blank' className="btn btn-primary">newsapi.org</a>
  </div>
</div>
</div></div>
  )
}

export default Home
