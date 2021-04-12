import React from 'react';
import './App.scss';
import TopStories from './components/ShowStories';
import Header from './components/Header';

function App() {
  return (
      <div className="App">
        <Header/>
        <TopStories />
      </div>
  );
}

export default App;
