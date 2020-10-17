import { timeoutCollection } from "time-events-manager/src/timeout/timeout-decorator";

const errorReducer = ( state=null, action ) => {
    switch (action.type) {
        case 'SET_ERROR': {
            return action.data
        }
        case "REMOVE_ERROR": {
            return action.data
        }
        default: return state
    }
}

export const clearError = () => {
    return {
        type: "REMOVE_ERROR",
        data: null
    }
}

export const setError = ( data, seconds=5 ) => {
    return  dispatch => {
        dispatch( { type: "SET_ERROR", data } )
        timeoutCollection.removeAll()
        setTimeout(() => { dispatch( clearError() )}, seconds * 1000)
    }
}


export default errorReducer