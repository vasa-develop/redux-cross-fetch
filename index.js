import fetch from 'cross-fetch'

export default ({dispatch, getState}) => next => action => {

    console.log("-------API MIDDLEWARE-------")
    console.log(action.type)

    if(action.type.includes("API_REQUEST")){
        
        /*
        @{url}: the request URL

        @{success}: action creator for successful response 
        Expects a payload for Server Response 

        @{failed}: action creator for failed response
        Expects a payload for Server Error

        @{start}: action creator for starting API Request
        Expects a payload for action

        @{stop}: action creator for ending API Request
        Expects a payload for action
        */

        const { url, method, headers = {}, body = {}, success, failed, start, stop } = action.payload;
        

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
