import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import './main.css'
import Login from './components/Login'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getUserBlogs().then(blogs => setBlogs(blogs)).catch(err => {
        console.log('error fetching blogs: ', err)
      })

    }
  }, [])


  const handleFormSubmit = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
      blogService.getUserBlogs().then(blogs => setBlogs(blogs)).catch(err => {
        console.log('error fetching blogs: ', err)
      })
    }
    catch (exception){
      setError(exception.response.data.error)
      setTimeout(() => {
        setError(null)
      }, 4000)
    }


  }
  return (
    <>
      {user === null
        ?
        <Login error= {error} username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleFormSubmit}/>
        :
        <Blogs user={user} blogs={blogs} updateBlogs={setBlogs} />
      }
    </>

  )
}

export default App