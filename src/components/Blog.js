import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import blogServices from '../services/blogs'
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from "react-redux";
import {setBlogs} from "../reducers/blogsReducer";


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 100,
        position: 'relative'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    header:{
        backgroundColor: '#1693BB',
        color: 'white',
        fontSize: '1rem !important',
        minHeight: '5rem',
        textAlign: 'center'
    },
    content: {
        position: 'relative'
    },
    pos: {
        marginBottom: 12,
    },
    action: {
        backgroundColor: '#B03972',
        position: 'relative',
        justifyContent: 'center',
        '&:hover':{
            cursor: 'pointer',
            backgroundColor: 'hsla(331, 51%, 46%, 0.84)'
        },
        '&:active':{
            backgroundColor: 'hsla(331, 51%, 43%, 0.91)'
        }
    },
    button: {
        color: 'white',
        marginRight: '6px'
    },
    spanLink: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 500
    },
    expandIconContainer: {
        position: 'absolute',
        top: 0,
        left: 5,
        '&:hover':{
            cursor: 'pointer',
            color: 'white'
        }
    },
    deleteIconContainer:{
        position: 'absolute',
        top: 0,
        right: 0,
        '&:hover':{
            cursor: 'pointer',
            color: '#ce054d'
        },
        '&:active':{
            color: 'red'
        },
        '&:focus': {
            color: 'white'
        }
    }
})

const Blog = ({ blog , index }) => {
    const [toggle, setToggle] = React.useState(false)
    const blogs = useSelector( state => state.blogs)
    const classes = useStyles()
    const dispatch = useDispatch()

    const deleteBlog = async () => {
        const newBlogs = blogs.filter(item => item.id !== blog.id)
        const response = await blogServices.deleteBlog(blog.id)
        dispatch(setBlogs(newBlogs))
        return response
    }

    const changeToggle = () => {
        setToggle(!toggle)
    }

    const changeLikes = async () => {
        const response = await blogServices.updateBlog(blog)
        const newBlogs = await blogServices.getUserBlogs()
        dispatch(setBlogs(newBlogs))
        return response
    }

    const handleLikes = e => {
        const newBlog = blog
        newBlog.likes = e.target.value
        const newBlogs = [].concat(blogs)
        newBlogs[index] = newBlog
        dispatch(setBlogs(newBlogs))
    }

    return (
        <div className="card">
            <Card className={classes.root} variant="outlined">
                <CardHeader className={classes.header} titleTypographyProps={{ variant:'subtitle1' }} title={blog.title} subheader={'by ' + blog.author} />
                {toggle === false ? <div onClick={changeToggle} className={classes.expandIconContainer}>
                    <ExpandMoreIcon style={{ color: 'inherit' }} />
                </div> :
                    <div onClick={changeToggle} className={classes.expandIconContainer}>
                        <UnfoldLessIcon style={{ color: 'inherit' }} />
                    </div>
                }
                <div onClick={deleteBlog} className={classes.deleteIconContainer}>
                    <HighlightOffIcon style={{ color: 'inherit' }}/>
                </div>
                {toggle === false ? <span></span> :
                    <div className='toggableContent'>
                        <p style={{ textAlign: 'center', fontSize: '1rem' }}>Likes: <input value={blog.likes} onChange={handleLikes} type="text"/><button onClick={changeLikes}>change</button></p>
                    </div>
                }
                <CardActions className={classes.action}>
                    <a target="_blank"  rel="noopener noreferrer" href={blog.url}>
                        <span className={classes.spanLink}></span>
                    </a>
                    <Typography className={classes.button}>Go to blog</Typography>
                    <OpenInNewIcon disabled style={{ color: 'white' }} />
                </CardActions>
            </Card>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

export default Blog
