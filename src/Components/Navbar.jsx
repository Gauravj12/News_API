import React from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

const Navbar=(props)=> {


    return (
      <div>
  <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NewsGlobal</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
        <li className="nav-item"><Link className='nav-link' to="/top">Top</Link></li>
          <li className="nav-item"><Link className='nav-link' to="/business">Business</Link></li>
          <li className="nav-item"><Link className='nav-link' to="/entertainment">Entertainment</Link></li>
          <li className="nav-item"><Link className='nav-link' to="/health">Health</Link></li>
          <li className="nav-item"><Link className='nav-link' to="/politics">Politics</Link></li>
          <li className="nav-item"><Link className='nav-link' to="/science">Science</Link></li>
          <li className="nav-item"><Link className='nav-link' to="/sports">Sports</Link></li>
          <li className="nav-item"><Link className='nav-link' to="/technology">Technology</Link></li>
          <li className="nav-item"><Link className='nav-link' to="/world">World</Link></li>
      </ul>
      <p>array length = {props.length}</p><p>language = {props.language}</p>
      <select className="form-select mx-5" value={props.language} onChange={props.onLanguageChange} aria-label="Default select example" style={{width:'100px'}}>
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      </select>
      <form className="d-flex" role="search">
        <input className="form-control me-2" onChange={props.onChange} type="search" placeholder="Search" aria-label="Search"/>
      </form>
    </div>
  </div>
</nav>
      </div>
    )
  
}

export default Navbar;