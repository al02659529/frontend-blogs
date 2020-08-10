import React from "react";
import Blog from './Blog';
import { Grid, Toolbar, IconButton, Button, TextField , Typography, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import NewBlog from './NewBlog'


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
        backgroundColor: "#B03972"
    },
    newLink: {
        flexGrow: 2
    },
    allBlogs: {
        flexGrow: 2
    },
    title:{
        fontSize: "2.3rem"
    },
    toggleButton:{
        border: "none",
        color: "white"
    },
    container:{
        marginTop: "2rem"
    }
}));


const Blogs = props => {
    let {user, blogs} = props;
    const classes = useStyles();
    const [page, setPage] = React.useState('all');
    const logout = () =>{
        localStorage.clear()
        window.location.reload(true)
    }
    const handlePage = (event, newPage) => {
        setPage(newPage);
    };

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
                <Grid className={classes.container} container justify="space-evenly" >
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    )}
                </Grid>
                :
                <NewBlog />
            }

        </div>
    )
}

export default Blogs;