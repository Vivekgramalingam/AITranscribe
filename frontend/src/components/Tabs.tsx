import React, { useState } from 'react';
import VideoToSummary from './VideoToSummary'
import VideoTosrt from './VideoTosrt'
import VideoToTranscript from './VideoToTranscript'

// Component for Tab 1
// function TabOne() {
//   return <VideoToSummary/>;
// }

// // Component for Tab 2
// function TabTwo() {
//   return <VideoTosrt />;
// }

// // Component for Tab 3
// function TabThree() {
//   return <VideoToTranscript/>;
// }

// Main component containing the tabs
function Tabs() {
  const [activeTab, setActiveTab] = useState(1);

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <VideoTosrt />;
      case 2:
        return <VideoToTranscript/>;
      case 3:
        return <VideoToSummary/>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab(1)}>Video to Srt</button>
        <button onClick={() => setActiveTab(2)}>Video to Transcript</button>
        <button onClick={() => setActiveTab(3)}>Video to Summary</button>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Tabs;
