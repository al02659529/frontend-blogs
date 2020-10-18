import React from 'react'
import blogServices from '../services/blogs'
import CircularProgress from '@material-ui/core/CircularProgress'
import MuiAlert from '@material-ui/lab/Alert'
import './NewBlog.css'
import { setBlogs } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../reducers/errorReducer'
import { setSuccess } from '../reducers/successReducer'
import { setSubmitted } from '../reducers/submittedReducer'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}


const NewBlog = () => {
    const error = useSelector( state => state.error)
    const isSubmitted = useSelector( state => state.isSubmitted)
    const success = useSelector( state => state.success)
    const dispatch = useDispatch()

    const newBlog = async e => {
        e.preventDefault()
        const title = e.target.title.value
        const author = e.target.author.value
        const likes = e.target.likes.value
        const url = e.target.url.value
        const blog = { title, author, likes, url }
        dispatch(setSubmitted(true))

        try {
            const newBlog = await blogServices.create(blog)
            const userBlogs = await blogServices.getUserBlogs()
            dispatch(setBlogs(userBlogs))
        }
        catch (exception) {
            dispatch(setSubmitted(false))
            dispatch(setSuccess('error'))
            dispatch(setError(exception.response.data.error))
        }

        setTimeout(() => {
            dispatch(setSubmitted(false))
            dispatch(setSuccess(true))
        }, 2000)
        setTimeout(() => {
            dispatch(setSuccess(null))
        }, 5000)
    }

    return (
        <form onSubmit={newBlog}>
            <div className="input">
                <label className="input_title" htmlFor="title" ><span><p>Title</p></span></label>
                <input className="input_value" type="text" id="title"/>
            </div>
            <div className="input">
                <label className="input_title" htmlFor="author" ><span><p>Author</p></span></label>
                <input className="input_value" type="text" id="author"/>
            </div>
            <div className="input">
                <label className="input_title" htmlFor="likes" ><span><p>Likes</p></span></label>
                <input className="input_value" type="text" id="likes"/>
            </div>
            <div className="input">
                <label className="input_title" htmlFor="url" ><span><p>URL</p></span></label>
                <input className="input_value" type="text" id="url"/>
            </div>
            <button className="btn" type="submit">Submit</button>
            {isSubmitted === true
                ? <CircularProgress />
                : null
            }
            {success === true
                ? <Alert severity="success">Blog added!</Alert>
                : success === 'error'
                    ? <Alert severity="error">{error}</Alert>
                    : null
            }
        </form>
    )
}



export default NewBlog