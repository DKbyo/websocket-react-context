import React from 'react';
import logo from './logo.svg';
import './App.css';
import Parent from './components/parent'
import GrandParent from './components/grandParent'
import Child from './components/child'
import EXAMPLE_SAGA, {exampleInitialValues} from './sagas/example.saga'
import {createSagaProvider, createSagaReducer} from 'react-context-saga'
// Create reducer using the saga async functions
const exampleReducer = createSagaReducer(EXAMPLE_SAGA);
// Create the provider using sagaName, the recently created reducer, and the initial values
// The state of this provider could be changed using dispatch method {type: "saga_async_function", payload: {color: "blue"}}
// 
// There are 2 reserved saga async functions, set and merge
// set:   Change certain value i.e. {type: "set", key:"color", payload: "red"}
// merge: Merge Immutable map i.e. {type: "merge", payload: { color: "red"}}

const WebsocketProvider = createSagaProvider({sagaName:'websocket', reducer:exampleReducer, initialValues:exampleInitialValues })
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