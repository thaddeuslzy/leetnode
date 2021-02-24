import React from 'react';
import LeetGraph from './components/LeetGraph';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <Sidebar width={300} height={"100vh"}>
        </Sidebar>
        <LeetGraph/>
      </div>
    </div>
  );
}

export default App;
