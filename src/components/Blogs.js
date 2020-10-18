import React from 'react'
import Blog from './Blog'
import { Toolbar, Button , Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import NewBlog from './NewBlog'
import './Blogs.css'
import blogsService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogsReducer'
import { setPage } from '../reducers/pageReducer'
import { setSort } from '../reducers/sortReducer'
import cookie from 'cookie_js'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    username: {
        flexGrow: 4,
    },
    maincolor:{
        backgroundColor: '#B03972'
    },
    newLink: {
        flexGrow: 2
    },
    allBlogs: {
        flexGrow: 2
    },
    title:{
        fontSize: '2.3rem'
    },
    toggleButton:{
        border: 'none',
        color: 'white'
    },
    container:{
        margin: '2rem 1rem'
    }
}))

const NoBlogs = () => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setPage('new'))
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h2 style={{ color: '#3f51b5' }}>No blogs yet, try <button className="newPage" onClick={handleClick} style={{ padding: '.5rem 2rem', borderRadius: '5px', border: '1px solid grey', cursor: 'pointer' }}>Adding a new blog</button></h2>
        </div>
    )
}


const Blogs = () => {
    const classes = useStyles()
    const user = useSelector(state => state.user)
    const blogs = useSelector( state => state.blogs)
    const page = useSelector( state => state.page)
    const sort = useSelector( state => state.sortBy)
    const dispatch = useDispatch()

    const logout = () => {
        cookie.remove('loggedBlogAppUser')
        window.location.reload(true)
    }
    const handlePage = (event, newPage) => {
        dispatch(setPage(newPage))
    }
    const sortByLikes = () => {
        const oldBlogList = [...blogs]
        const sortedBlogs = oldBlogList.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes) )
        dispatch(setBlogs(sortedBlogs))
    }

    const sortByDate = async () => {
        const databaseBlogs = await blogsService.getUserBlogs()
        dispatch(setBlogs(databaseBlogs))
    }

    return (

        <div>
            <AppBar position="static">
                <Toolbar className={classes.maincolor}>
                    <Typography variant="h6" edge="start" className={classes.username}>
                        {user.name}
                    </Typography>
                    <ToggleButtonGroup
                        value={page}
                        exclusive
                        onChange={handlePage}
                        size="medium"
                    >
                        <ToggleButton className={classes.toggleButton} value="all" >
                            <div className={classes.allBlogs} color="inherit">All your blogs</div>
                        </ToggleButton>
                        <ToggleButton className={classes.toggleButton} value="new" >
                            <div className={classes.newLink} color="inherit">Add new link</div>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Button onClick={logout} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
            {page === 'all' ?
                <>
                    <div style={{ display: 'flex', justifyContent:'flex-end', margin: '1rem' }}>
                        <div>
                            <p style={{ display: 'inline-block', fontSize: '1rem', marginRight: '1rem', color: 'grey' }}>Sort by</p>
                            <ToggleButtonGroup value={sort} exclusive onChange={(e, newSort) => {
                                dispatch(setSort(newSort))
                            }}>
                                <ToggleButton value="date" onClick={sortByDate}>Date</ToggleButton>
                                <ToggleButton value="likes" onClick={sortByLikes}>Likes</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                    {blogs.length < 1 ? <NoBlogs setPage={setPage} />
                        :
                        <div className="grid-container" >
                            { blogs.map((blog, index) => <Blog key={blog.id} index={index} blog={blog} />) }
                        </div>
                    }

                </>
                :
                <NewBlog />
            }

        </div>
    )
}


export default Blogs