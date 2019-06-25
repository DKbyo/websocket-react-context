/*
    Example of call async methods that can modify the React Context State
*/
import React from 'react';
import {useSagaState} from 'react-context-saga'

export default function GrandParent(){    
    // Get state and dispatch method, altought we will use only dispatch here
    const [state, dispatch] = useSagaState('websocket');
    return (                
        <div>
            <div>
                <button onClick={() => dispatch({type: 'getReactProyects'})}>Get React Proyects</button>
            </div>
            <div>
                <button disabled={state.get("connected")} onClick={() => dispatch({type: 'connect'})}>Connect</button>
                <button disabled={!state.get("connected")} onClick={() => dispatch({type: 'getInfo'})}>Get Info</button>
            </div>
        </div>
    )
}