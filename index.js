import fetch from 'cross-fetch'

export default ({dispatch, getState}) => next => action => {
    const API_TAG = "[API MIDDLEWARE]";

    console.log(`-------${API_TAG}-------`)
    console.log(action.type)

    if(action.type.includes("API_REQUEST")){
        
        /*
        @param url: [REQUIRED] the request URL

        @param method: [REQUIRED] HTTP method

        @param headers: [OPTIONAL] headers sent with the HTTP request
        
        @param body: [OPTIONAL] body sent with the HTTP request

        @param success: [REQUIRED] action creator for successful response 
        Expects a payload for Server Response 

        @param failed: [REQUIRED] action creator for failed response
        Expects a payload for Server Error

        @param start: [REQUIRED] action creator for starting API Request
        Expects a payload for action

        @param stop: [REQUIRED] action creator for ending API Request
        Expects a payload for action
        */

        const { url, method, headers = {}, body = {}, success, failed, start, stop } = action.payload;
        
        const throwError = error => {
            console.error(error)
            next(action)
        }

        const isValidUrl = string => {
            try {
              new URL(string);
              return true;
            } catch (_) {
              return false;  
            }
          }

        typeof(stop) !== "function"  ? throwError(`${API_TAG} success needs to a function`) : console.log()
        typeof(stop) !== "function"  ? throwError(`${API_TAG} falied needs to a function`) : console.log()
        typeof(stop) !== "function"  ? throwError(`${API_TAG} start needs to a function`) : console.log()
        typeof(stop) !== "function"  ? throwError(`${API_TAG} stop needs to a function`) : console.log()
        typeof(url) !== "string" ? throwError(`${API_TAG} url missing`) : console.log()
        typeof(method) !== "string" ? throwError(`${API_TAG} HTTP method missing`) : console.log()
        isValidUrl(url) ? console.log() : throwError(`${API_TAG} isValid URL provided`)
        
        //Dispatching action to notify the application that the api request has started
        dispatch(start(action));

        let params = {
            method: method,
            headers: headers
        }
        if(method != ("GET" || "HEAD")){
            params.body = body
        }

        fetch(url,params)
        .then(res => ( res.ok ? res.json() : new Error('Something went wrong') ) )
        .then(data => {
            //Dispatching action to notify the application that the api request has ended
            dispatch(stop(action))
            
            //Dispatching action to pass the fetched data
            next(success(data))
        })
        .catch(error => {
            //Dispatching action to notify the application that the api request has ended
            dispatch(stop(action))
            
            //Dispatching action to pass the fetched data
            next(failed(error))
        })
    }
    else next(action) //Dispatching action normally, if the action is not of type API_REQUEST
}
