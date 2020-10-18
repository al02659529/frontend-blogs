const showLikesReducer = (state=[], action) => {
    switch (action.type){
    case 'SHOW_LIKES_OF_COMPONENT' :{
        const isIdInState = state.filter(id => id === action.id)
        if (isIdInState){
            return state
        }
        return state.concat(action.id)
    }
    case 'CLOSE_LIKES_OF_COMPONENT': {
        return state.filter(id => id !== action.id)
    }
    case 'TOGGLE_VIEW_OF_LIKES':{
        const isIdInState = state.filter(id => id === action.id)

        if (isIdInState.length > 0){
            return state.filter(id => id !== action.id)
        }
        return state.concat(action.id)
    }
    default: return state
    }
}

export const addComponentIdToShowLikes = id => {
    return { type: 'SHOW_LIKES_OF_COMPONENT', id }
}

export const removeComponentIdToNotShowLikes = id => {
    return { type: 'CLOSE_LIKES_OF_COMPONENT', id }
}

export const toggleIdOfComponentToHideOrShowLikes = id => {
    return { type: 'TOGGLE_VIEW_OF_LIKES', id }
}

export default showLikesReducer