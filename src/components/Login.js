import React from 'react'
import { Button, TextField , Typography, Container } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import Register from './Register'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername } from '../reducers/usernameReducer'
import { setPassword } from '../reducers/passwordReducer'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { setError } from '../reducers/errorReducer'
import { setBlogs } from '../reducers/blogsReducer'
import { setPage } from '../reducers/pageReducer'
import cookie from 'cookie_js'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const RegisterHandler = () => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setPage('register'))
    }
    return (
        <div>
            <p>Not a user? <button onClick={handleClick} style={{ display: 'inline-block' }}>Register here</button></p>
        </div>
    )
}


const Login = () => {

    const dispatch = useDispatch()
    const username = useSelector( state => state.username )
    const password = useSelector( state => state.password)
    const error = useSelector( state => state.error)
    const currentPage = useSelector( state => state.page)


    const handleLogin = async event => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            dispatch(setUser(user))
            blogService.setToken(user.token)
            cookie.set('loggedBlogAppUser', JSON.stringify(user), { expires: 7 })
            dispatch(setUsername(''))
            dispatch(setPassword(''))
            const userBlogs = await blogService.getUserBlogs()
            dispatch(setBlogs(userBlogs))
            dispatch(setPage('all'))
        }
        catch (exception){
            dispatch(setError(exception.response.data))
        }
    }


    return (
        <>
            {currentPage === 'login' ?
                <>
                    <Container>
                        <Typography paragraph align="center" variant='h3' color="primary">Bloggie</Typography>
                        <Container>
                            <form id="loginForm" onSubmit={handleLogin}>
                                <TextField value={username} onChange={ ( { target } ) => dispatch(setUsername(target.value)) } size="small" label="username" variant="outlined" required></TextField>
                                <TextField value={password} onChange={ ( { target } ) => dispatch(setPassword(target.value)) } size="small" type="password" label="password" variant="outlined" required></TextField>
                                <Button size="small" type="submit" variant="contained" color="primary">Login</Button>
                                <RegisterHandler ></RegisterHandler>
                                {error !== null  ?
                                    <Alert severity="error">{error}</Alert> : <span></span>
                                }
                            </form>
                        </Container>
                    </Container>
                </>
                : currentPage === 'register' ? <Register setPage={setPage} setBlogs={setBlogs}/> : <h1>invalid page</h1>
            }
        </>
    )

}

export default Login