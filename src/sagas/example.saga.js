async function connect(state, payload, dispatch){
    const websocket = new WebSocket("wss://echo.websocket.org/");

    websocket.onopen = function(evt) { 
        dispatch({
            type: 'merge',
            payload: {connected: true}
        })
    };
    websocket.onclose = function(evt) { 
        dispatch({
            type: 'merge',
            payload: {connected: false}
        })
    };
    websocket.onmessage = function(evt) { 
        const msg = JSON.parse(evt.data)
        dispatch({
            type: 'remote_'+msg.method,
            payload: {
                args: msg.args,
                kwargs: msg.kwargs
            }
        })
    };
    websocket.onerror = function(evt) { 

    };    
    dispatch({
        type: 'set',
        key: 'websocket',
        payload: websocket
    })
}
async function remote_ping(state, payload, dispatch){
    return state.set("pings", state.get("pings")+1)
                .set("lastPing", payload.args[0])
}

async function getInfo(state, payload, dispatch){
    const websocket = state.get('websocket')
    websocket.send('{"method":"ping","args":["'+(new Date())+'"], "kwargs": {}}')
}

const EXAMPLE_SAGA ={
    connect,
    getInfo,
    remote_ping
};



const webSocketReducer = (state, action) => {
    if (action.type === 'merge'){
        return state.merge(action.payload)
    }else if (action.type === 'set'){
        return state.set(action.key, action.payload)
    }else {
        EXAMPLE_SAGA[action.type](state, action.payload, action.dispatch).then((stateResponse)=> {
            if(stateResponse){
                action.dispatch({type: 'merge', payload: stateResponse});
            }
        })
    }
    return state;
}

export {webSocketReducer}