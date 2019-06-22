import React, {useState} from 'react';
import {useWebsocketState} from '../context/websocket.context'

export default function GrandParent(props){

    
    const [{connected}, dispatch] = useWebsocketState();
    return (                
        <div>
            <button onClick={() => dispatch({type: 'connect'})}>Connect</button>
            <button onClick={() => dispatch({type: 'getInfo'})}>Get Info</button>
        </div>
    )
}