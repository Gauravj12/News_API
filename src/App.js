import React, { useState } from 'react'
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App =()=> {
 let pageSize=10;
 const apiKey=process.env.REACT_APP_API_KEY

  const [progress, setProgress] = useState(0);
   
  
    return (
      <div>
        <Router>
        <LoadingBar height={3} color='#f11946' progress={progress}/>
        <Routes>
        <Route exact path="/"element={<News apiKey={apiKey} setProgress={setProgress} key="top" pageSize={pageSize} country="in" category="top"/>}/>
          <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key='business' pageSize={pageSize} country='in' category='business'/>} />
          <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key='entertainment' pageSize={pageSize} country='in' category='entertainment'/>} />
          <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key='health' pageSize={pageSize} country='in' category='health'/>} />
          <Route exact path="/politics" element={<News apiKey={apiKey} setProgress={setProgress} key='politics' pageSize={pageSize} country='in' category='politics'/>} />
          <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key='science' pageSize={pageSize} country='in' category='science'/>} />
          <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key='sports' pageSize={pageSize} country='in' category='sports'/>} />
          <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key='technology' pageSize={pageSize} country='in' category='technology'/>} />
          <Route exact path="/environment" element={<News apiKey={apiKey} setProgress={setProgress} key='environment' pageSize={pageSize} country='in' category='environment'/>} />
          <Route exact path="/world" element={<News apiKey={apiKey} setProgress={setProgress} key='world' pageSize={pageSize} country='in' category='world'/>} />
        </Routes>
        </Router>
      </div>
    )
  }
export default App;

