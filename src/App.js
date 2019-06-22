import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Parent from './components/parent'
import GrandParent from './components/grandParent'
import Child from './components/child'
import {WebsocketProvider} from './context/websocket.context'
function App(){  
  
  return (      
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />        
      </header>
      <section id="family">     
          <WebsocketProvider>
            <GrandParent/>
            <Parent />
            <Child />          
          </WebsocketProvider>     
      </section>
    </div>
  );
}

export default App;
