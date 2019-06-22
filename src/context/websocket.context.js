import React, {useReducer, useContext} from 'react';
import {webSocketReducer} from '../sagas/example.saga'
import Immutable from 'immutable';

const defaultValues = {
    websocket: null,
    campaigns: [],
    connected: false,
    pings: 0,
    lastPings: ''
}

const initialValues = Immutable.fromJS(defaultValues)

const WebsocketContext = React.createContext();

const WebsocketProvider = ({children}) =>(
    <WebsocketContext.Provider value={useReducer(webSocketReducer, initialValues)}>
      {children}
    </WebsocketContext.Provider>
);

const useState = () => useContext(WebsocketContext);

const useWebsocketState = ()=> {
    const [state, dispatch ] = useState()
    const dispatchWithDispatch = (args)=> dispatch({...args, dispatch: dispatchWithDispatch})
    return [state, dispatchWithDispatch]
}

export default WebsocketContext;
export {initialValues, WebsocketProvider, useWebsocketState};