import React from 'react'
import { Button, TextField , Typography, Container } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
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
import { useHistory } from 'react-router-dom'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}




const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const username = useSelector( state => state.username )
    const password = useSelector( state => state.password)
    const error = useSelector( state => state.error)

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            dispatch(setUser(user))
            blogService.setToken(user.token)
            cookie.set('loggedBlogAppUser', JSON.stringify(user), { expires: 7, path: '/' })
            dispatch(setUsername(''))
            dispatch(setPassword(''))
            const userBlogs = await blogService.getUserBlogs()
            dispatch(setBlogs(userBlogs))
            dispatch(setPage('all'))
        }
        catch (exception){
            dispatch(setError(exception.response.data.error))
        }
    }

    const handleClick = () => {
        dispatch(setPage('register'))
        history.push('/register')
    }

    return (
        <>
            <Container>
                <Typography paragraph align="center" variant='h3' color="primary">Bloggie</Typography>
                <Container>
                    <form id="loginForm" onSubmit={handleLogin}>
                        <TextField value={username} onChange={ ( { target } ) => dispatch(setUsername(target.value)) } size="small" label="username" variant="outlined" required></TextField>
                        <TextField value={password} onChange={ ( { target } ) => dispatch(setPassword(target.value)) } size="small" type="password" label="password" variant="outlined" required></TextField>
                        <Button size="small" type="submit" variant="contained" color="primary">Login</Button>
                        <div>
                            <p>Not a user? <button onClick={handleClick} style={{ display: 'inline-block' }}>Register here</button></p>
                        </div>
                    </form>
                    {error !== null  ?
                        <div className="alertWrapper">
                            <Alert severity="error">{error}</Alert>
                        </div>: null
                    }
                </Container>
            </Container>
        </>
    )
}

export default Login