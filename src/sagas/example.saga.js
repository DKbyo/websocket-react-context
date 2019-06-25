// Use immutable to improve performance and avoid a mess
import Immutable from 'immutable'
import request from 'superagent';
const getReactProyects =async  (state, payload, dispatch)=>{
    return request.get("https://api.github.com/search/repositories?q=react&sort=stars&order=desc")
            .then((response)=>{
                return {
                    "reactProyects": response.body.total_count
                }
            })
}
async function connect(state, payload, dispatch){    
    const websocket = new WebSocket("wss://echo.websocket.org/");

    websocket.onopen = function(evt) { 
        // Call merge action to update state with connected: true
        dispatch({
            type: 'merge',
            payload: {connected: true}
        })
    };
    websocket.onclose = function(evt) { 
        // Call merge action to update state with connected: false
        dispatch({
            type: 'merge',
            payload: {connected: false}
        })
    };
    websocket.onmessage = function(evt) { 
        const msg = JSON.parse(evt.data)
        // Call a async saga function with args and kwargs
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
    // Save current websocket in state
    dispatch({
        type: 'set',
        key: 'websocket',
        payload: websocket
    })
}
// Declare remote async method that will be called from Server
async function remote_ping(state, payload, dispatch){
    return state.set("pings", state.get("pings")+1)
                .set("lastPing", payload.args[0])
}
// Declare async method that will be called from UI
async function getInfo(state, payload, dispatch){
    //Get websocket object from state
    const websocket = state.get('websocket')
    websocket.send('{"method":"ping","args":["'+(new Date())+'"], "kwargs": {}}')
}

const EXAMPLE_SAGA ={
    connect,
    getInfo,
    remote_ping,
    getReactProyects
};

const exampleInitialValues = Immutable.fromJS({
    websocket: null,
    campaigns: [],
    connected: false,
    pings: 0,
})

export default EXAMPLE_SAGA;

export {
    exampleInitialValues
}