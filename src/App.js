import React, { useEffect } from 'react'
import blogService from './services/blogs'
import './main.css'
import Login from './components/Login'
import Blogs from './components/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogsReducer'
import { setPage } from './reducers/pageReducer'
import cookie from 'cookie_js'
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Logout from './components/Logout'
import Register from './components/Register'


const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        const loggedUserJSON = cookie.get('loggedBlogAppUser')
        console.log('Cookie state: ', loggedUserJSON)
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
            <Switch>
                <Route path="/logout">
                    <Logout/>
                </Route>
                <Route path="/register">
                    {user ? <Redirect to="/blogs"/>: <Register/>}
                </Route>
                <Route path="/login">
                    {user ? <Redirect to="/blogs"/> : <Login/>}
                </Route>
                <Route path="/blogs">
                    {user ? <Blogs /> : <Redirect to="/" />}
                </Route>
                <Route path="/">
                    {user === null ? <Redirect to="/login"/> : <Redirect to="/blogs"/>}
                </Route>
            </Switch>
        </>

    )
}

export default App