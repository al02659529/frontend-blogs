import React, { useEffect } from 'react'
import cookie from 'cookie_js'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogsReducer'
import { setPage } from '../reducers/pageReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    console.log('this code is also reachable')

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
            {user === null
                ?
                <Redirect to="/login"/>
                :
                <Redirect to="/blogs" />
            }
        </>
    )
}

export default Home