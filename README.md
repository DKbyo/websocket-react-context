## websocket-react-context

This is a brief example of use websockets with the new React Context API, I tried to follow the react-redux-saga aproach, so you can declare async functions in ./sagas/example.saga.js and call them in ./components/grandParent.js using dispatch. 

## How call async functions?

The trick is passing the dispatch object when we actually call the dispatch function you can see this in ./context/websocket.context then we can call the function as a promise using useReducer method, and call dispatch if the object already return a state. You can see that you can also call dispatch method in the async functions declared in the EXAMPLE_SAGA definition object.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
