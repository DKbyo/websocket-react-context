import React, {Component} from 'react';
import WebsocketContext from '../context/websocket.context'

export default function Parent(){
    console.log("Render parent")
    return (
        <WebsocketContext.Consumer >
            {([state , dispatch]) => 
                <div>
                    Connected {state.get("connected")?'connected':'not connected'}
                </div>
            }
        </WebsocketContext.Consumer>
    )
}