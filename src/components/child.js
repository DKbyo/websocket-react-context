import React, {Component} from 'react';
import {useWebsocketState} from '../context/websocket.context'

export default function Child(){
    const [state, dispatch] = useWebsocketState();

    return (
        <div>
            Pings {state.get("pings")}
            <br/>
            Last ping {state.get("lastPing")}
        </div>
    )
}