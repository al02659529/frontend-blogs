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
import PropTypes from 'prop-types'

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


const Blogs = props => {
  let { user, blogs, updateBlogs } = props
  const classes = useStyles()
  const [page, setPage] = React.useState('all')
  const [sort, setSort] = React.useState('date')
  const logout = () => {
    localStorage.clear()
    window.location.reload(true)
  }
  const handlePage = (event, newPage) => {
    setPage(newPage)
  }
  const sortByLikes = () => {
    const oldBlogList = [...blogs]
    const sortedList = oldBlogList.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes))
    updateBlogs(sortedList)
  }

  const sortByDate = async () => {
    const databaseBlogs = await blogsService.getUserBlogs()
    updateBlogs(databaseBlogs)
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
                setSort(newSort)
              }}>
                <ToggleButton value="date" onClick={sortByDate}>Date</ToggleButton>
                <ToggleButton value="likes" onClick={sortByLikes}>Likes</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <div className="grid-container" >
            {sort === 'date' ? blogs.map((blog, index) =>
              <Blog key={blog.id} index={index} blog={blog} blogs={blogs} updateBlogs={updateBlogs}/>
            ) :
              blogs.map((blog, index) =>
                <Blog key={blog.id} index={index} blog={blog} blogs={blogs} updateBlogs={updateBlogs}/>)

            }

          </div>
        </>
        :
        <NewBlog updateBlogs={updateBlogs} />
      }

    </div>
  )
}

Blogs.propTypes ={
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  updateBlogs: PropTypes.func.isRequired
}
export default Blogs