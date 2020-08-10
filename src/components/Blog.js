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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 100
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
  }
});

const Blog = ({ blog }) => {
  const classes = useStyles();
  return (
      <Grid item lg={4}>
        <Card className={classes.root} variant="outlined">
          <CardHeader className={classes.header} titleTypographyProps={{variant:'subtitle1'}}title={blog.title} subheader={"by " + blog.author} />

          <CardActions className={classes.action}>
            <a target="_blank"  rel="noopener noreferrer" href={blog.url}>
              <span className={classes.spanLink}></span>
            </a>
              <Typography className={classes.button}>Go to blog</Typography>
              <OpenInNewIcon disabled style={{color: "white"}} />
          </CardActions>
        </Card>

      </Grid>
  )
}

export default Blog
