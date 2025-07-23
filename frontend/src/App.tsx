import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/VideoToSummary'
// import VideoToSummary from './components/VideoToSummary'
// import VideoTosrt from './components/VideoTosrt'
// import VideoToTranscript from './components/VideoToTranscript'
import { Routes, Route } from 'react-router-dom';
import Tabs from './components/Tabs'

function App() {
  

  return (


    <div>
      
      <Tabs/>
      

    </div>
//     <div>

// <button > Video to Srt</button>
// <button> Video to Summary</button>
// <button> Video to Transcript</button>
// </div>
/* <Routes>
<Route path="/" element={<VideoToSummary />} />
            <Route path="/products" element={<VideoTosrt />} />
            <Route path="/about" element={<About />} />
</Routes> */
  //  <VideoToSummary />
  //  <VideoTosrt/>
  //  <VideoToTranscript />
  )
}

export default App
