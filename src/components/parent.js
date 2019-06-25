/*
    Example of react-context-saga using Context.Consumer
*/
import React from 'react';
import {getConsumer} from 'react-context-saga'

const WebsocketConsumer = getConsumer('websocket')

export default function Parent(){
    return (
        <WebsocketConsumer>
            {([state]) => 
                <div>
                    Connected {state.get("connected")?'connected':'not connected'}
                    <br/>
                    React Proyects {state.get("reactProyects")}
                </div>
            }
        </WebsocketConsumer>
    )
}