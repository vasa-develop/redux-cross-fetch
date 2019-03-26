*Add `redux-cross-fetch` middleware to `createStore()`*

## store.js

```
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import apiMiddleWare from 'redux-cross-fetch'

const store = createStore(rootReducer, applyMiddleware(apiMiddleWare))
window.store = store;

export default store
```

*Create actions with `type` including the string `API_REQUEST` to fire the middleware.*

The middleware takes following params:


        @{url}: [REQUIRED] the request URL

        @{method}: [REQUIRED] HTTP method

        @{headers}: [OPTIONAL] headers sent with the HTTP request
        
        @{body}: [OPTIONAL] body sent with the HTTP request

        @{success}: [REQUIRED] action creator for successful response 
        Expects a payload for Server Response 

        @{failed}: [REQUIRED] action creator for failed response
        Expects a payload for Server Error

        @{start}: [REQUIRED] action creator for starting API Request
        Expects a payload for action

        @{stop}: [REQUIRED] action creator for ending API Request
        Expects a payload for action
        

## actions.js

```
export const getGitHubProfile = username => {
    return({
        type: "[GITHUB] API_REQUEST",
        payload: {
            url: "https://api.github.com/users/cluster-labs",
            method: "GET",
            success: responseSuccess,
            failed: responseFailed,
            start: startFetching,
            stop: stopFetching
        }
    })
}

export const responseSuccess = response => {
    return{
        type: types.RESPONSE_SUCCESS,
        payload: response
    }
}

export const responseFailed = error => {
    console.log( types.RESPONSE_FAILED+"  "+error)
    return{
        type: types.RESPONSE_FAILED,
        payload: error
    }
}

export const startFetching = action => {
    return{
        type: types.FETCH_START,
        payload: action
    }
}

export const stopFetching = action => {
    return{
        type: types.FETCH_STOP,
        payload: action
    }
}
```
