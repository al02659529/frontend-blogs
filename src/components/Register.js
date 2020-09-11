import React from 'react'
import './Register.css'
import { Button } from '@material-ui/core'
import service from '../services/register'
import loginService from '../services/login'
import blogService from '../services/blogs'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Register = props => {
    let { setPage, setUser, setBlogs, setError, error } = props

    const handleSubmit = async e => {
        e.preventDefault()
        const name = e.target.name.value
        const username = e.target.username.value
        const password = e.target.password.value

        const newUser = { name, username, password }
        console.log(newUser)
        try{
            const response = await service.registerUser(newUser)
            const user = await loginService.login({ username, password })
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )

            blogService.getUserBlogs().then(blogs => setBlogs(blogs)).catch(err => {
                console.log('error fetching blogs: ', err)
            })
        }
        catch (exception){
            setError(exception.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 6000)
        }
    }
    const handleGoBackToLoginPage = () => {
        setPage('login')
    }
    return (
        <div>
            <div className="nav">
                <Button size="small" onClick={handleGoBackToLoginPage} variant="contained" color="secondary">Go back to Login page</Button>
            </div>
            <form onSubmit={handleSubmit}>

                <div className="input_group">
                    <label htmlFor="Password">Name</label>
                    <input placeholder="John Doe" type="text" name="name" id="name"/>
                </div>
                <div className="input_group">
                    <label htmlFor="username">Username</label>
                    <input placeholder="3-15 characters" type="text" id="username"/>
                </div>
                <div className="input_group">
                    <label htmlFor="Password">Password</label>
                    <input placeholder="Must be a secure password" type="password" id="password"/>
                </div>
                <Button size="small" type="submit" variant="contained" color="primary">Register</Button>

            </form>
            {error !== null  ?
                <div className="alertWrapper">
                    <Alert severity="error">{error}</Alert>
                </div>: <span></span>
            }
        </div>
    )
}

export default Register