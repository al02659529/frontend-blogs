import React, { useEffect } from 'react'
import blogService from './services/blogs'
import './main.css'
import Login from './components/Login'
import Blogs from './components/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import {setUser} from './reducers/userReducer'
import {setBlogs} from "./reducers/blogsReducer";
import {setPage} from "./reducers/pageReducer";


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
      blogService.getUserBlogs().then(blogs => dispatch(setBlogs(blogs))).catch(err => {
        console.log('error fetching blogs: ', err)
      })
    } else {
      dispatch(setPage('login'))
    }
  }, [dispatch])



  return (
    <>
      {user === null
        ?
          <Login />
        :
          <Blogs />
      }
    </>

  )
}

export default App