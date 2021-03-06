const blogsReducer = (state=[], action) => {
    switch (action.type){
    case 'SET_BLOGS':{
        return action.data
    }
    default: return state
    }
}

export const setBlogs = data => {
    return { type: 'SET_BLOGS', data }
}

export default blogsReducer