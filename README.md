*Add `redux-cross-fetch` middleware to `createStore()`*

## store.js

```
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import apiMiddleWare from 'redux-cross-fetch'

const store = createStore(rootReducer, applyMiddleware(apiMiddleWare))

export default store
```


The middleware takes following params:


```
        @param {url}: [REQUIRED] the request URL

        @param {method}: [REQUIRED] HTTP method

        @param {headers}: [OPTIONAL] headers sent with the HTTP request
        
        @param {body}: [OPTIONAL] body sent with the HTTP request
        
        @param {success}: [REQUIRED] action creator for successful response 
        Expects a payload for Server Response 

        @param {failure}: [REQUIRED] action creator for failed response
        Expects a payload for Server Error
```


## actions.js


*Create actions with `type` including the string `API_REQUEST` to fire the middleware.*


```
export const testAction = () => ({
    type: "API_REQUEST",
    payload: {
        request: {
            url: "https://api.github.com/users/vasa-develop",
            method: "GET"
        },
        success: apiSuccess,
        failure: apiFailure
    }
})

export const apiSuccess = (response) => ({
    type: "API_SUCCESS",
    payload: {
        response: response
    }
})

export const apiFailure = (error) => ({
    type: "API_FAILURE",
    payload: {
        error: error
    }
})
```
