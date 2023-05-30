import React from 'react'
import Navbar from './Navbar'


const Home=()=> {
  return (
    <div>
    <Navbar/>
    <div className='container-fluid' style={{marginTop:'70px'}}>
    <div className="card text-center">
  <div className="card-body">
    <h5 className="card-title">NEWSDATA .IO</h5>
    <p className="card-text">Best News API To Search, Collect, And Track Worldwide News</p>
    <a href="https://newsdata.io/" rel="noreferrer" target='_blank' className="btn btn-primary">Go to newsdata.io...</a>
  </div>
</div>
</div>
</div>
  )
}

export default Home
