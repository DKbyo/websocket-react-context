/*
    Example of react-context-saga with useSagaState
*/
import React from 'react';
import {useSagaState} from 'react-context-saga'

export default function Child(){
    const [state] = useSagaState('websocket');

    return (
        <div>
            Pings {state.get("pings")}
            <br/>
            Last ping {state.get("lastPing")}
        </div>
    )
}