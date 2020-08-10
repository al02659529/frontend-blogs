import React from "react";
import blogServices from '../services/blogs'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './NewBlog.css'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


const NewBlog = () => {
    const [submitted, setSubmitted] = React.useState('false')
    const [succes, setSuccess] = React.useState(null)
    const [errorMessage, setErrorMessage] = React.useState('')

    const newBlog = async e =>{
        e.preventDefault()
        const title = e.target.title.value
        const author = e.target.author.value
        const likes = e.target.likes.value
        const url = e.target.url.value
        setSubmitted(true)
        const blog = {
            title,
            author,
            likes,
            url
        }
        blogServices.create(blog).then(() =>{
            setTimeout(() =>{
                setSubmitted(false)
                setSuccess(true)
            }, 2000)
            setTimeout(() => {
                setSuccess('')
            }, 5000)
        }).catch(err => {
            setSubmitted(false)
            setSuccess('error')
            setErrorMessage(err.response.data.error)
            setTimeout(() =>{
                setSuccess(null)
                setErrorMessage('')
            }, 5000)
        })

    }
    return (
            <form onSubmit={newBlog} >
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
                {submitted === true ?
                    <CircularProgress /> : <span></span>
                }
                {succes === true ?
                    <Alert severity="success">Blog added!</Alert> :
                    succes === 'error' ? <Alert severity="error">{errorMessage}</Alert> : <span></span>
                }
            </form>
    )
}

export default NewBlog;