import React from 'react'
import { Grid , IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import blogServices from '../services/blogs'
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 100,
    position: "relative"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  header:{
    backgroundColor: "#1693BB",
    color: "white",
    fontSize: "1rem !important",
    minHeight: "5rem",
    textAlign: "center"
  },
  content: {
    position: "relative"
  },
  pos: {
    marginBottom: 12,
  },
  action: {
    backgroundColor: "#B03972",
    position: "relative",
    justifyContent: "center",
    '&:hover':{
      cursor: "pointer",
      backgroundColor: "hsla(331, 51%, 46%, 0.84)"
    },
    '&:active':{
      backgroundColor: "hsla(331, 51%, 43%, 0.91)"
    }
  },
  button: {
    color: "white",
    marginRight: "6px"
  },
  spanLink: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 500
  },
  expandIconContainer: {
    position: "absolute",
    top: 0,
    left: 5,
    '&:hover':{
      cursor: "pointer",
      color: "white"
    }
  },
  deleteIconContainer:{
    position: "absolute",
    top: 0,
    right: 0,
    "&:hover":{
      cursor: "pointer",
      color: "#ce054d"
    },
    "&:active":{
      color: "red"
    },
    "&:focus": {
      color: "white"
    }
  }
});

const Blog = ({ blog , blogs, updateBlogs, index}) => {
  const classes = useStyles();
  const baseUrl = 'http://localhost:3001/blogs'
  const [toggle, setToggle] = React.useState(false)


  const deleteBlog = async () =>{
    const newBlogs = blogs.filter(item => item.id !== blog.id)
    const response = await blogServices.deleteBlog(blog.id)
    updateBlogs(newBlogs)
  }
  const changeToggle = () =>{
    setToggle(!toggle)
  }

  const changeLikes = async () =>{
    const response = await blogServices.updateBlog(blog)
    console.log("update" , response)
    const newBlogs = await blogServices.getUserBlogs()
    console.log("new blogs update", newBlogs)
    updateBlogs(newBlogs)
  }
  const handleLikes = e =>{
    // const filteredBlog = blogs.filter(iter => iter.id === blog.id)
    const newBlog = blog
    newBlog.likes = e.target.value
    console.log(newBlog)
    const newBlogs = [].concat(blogs)
    console.log(newBlogs)
    newBlogs[index] = newBlog
    console.log(newBlogs)
    updateBlogs(newBlogs)

  }
  return (
      <Card className={classes.root} variant="outlined">
        <CardHeader className={classes.header} titleTypographyProps={{variant:'subtitle1'}}title={blog.title} subheader={"by " + blog.author} />
        {toggle === false ? <div onClick={changeToggle} className={classes.expandIconContainer}>
          <ExpandMoreIcon style={{color: "inherit"}} />
        </div> :
            <div onClick={changeToggle} className={classes.expandIconContainer}>
              <UnfoldLessIcon style={{color: "inherit"}} />
            </div>
        }
        <div onClick={deleteBlog} className={classes.deleteIconContainer}>
          <HighlightOffIcon style={{color: "inherit"}}/>
        </div>
        {toggle === false ? <span></span> :
          <div>
           <p style={{textAlign: "center", fontSize: "1rem"}}>Likes: <input value={blog.likes} onChange={handleLikes} type="text"/><button onClick={changeLikes}>change</button></p>

          </div>
        }
        <CardActions className={classes.action}>
          <a target="_blank"  rel="noopener noreferrer" href={blog.url}>
            <span className={classes.spanLink}></span>
          </a>
          <Typography className={classes.button}>Go to blog</Typography>
          <OpenInNewIcon disabled style={{color: "white"}} />
        </CardActions>
      </Card>
  )
}

export default Blog
