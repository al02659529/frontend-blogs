import React from 'react'
import { Button, TextField , Typography, Container } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import Register from "./Register";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const RegisterHandler = props => {
    const handleClick = () => {
        props.setPage('register')
    }
    return (
        <div>
            <p>Not a user? <button onClick={handleClick} style={{ display: 'inline-block' }}>Register here</button></p>
        </div>
    )
}


const Login = props => {
    let { setError, setBlogs, setUser, username, password, setUsername, setPassword, handleLogin, error } = props
    const [currentPage, setPage] = React.useState('login')

    return (
        <>
            {currentPage === 'login' ?
                <>
                    <Container>
                        <Typography paragraph align="center" variant='h3' color="primary">Bloggie</Typography>
                        <Container>
                            <form id="loginForm" onSubmit={handleLogin}>
                                <TextField value={username} onChange={({ target }) => setUsername(target.value)} size="small" label="username" variant="outlined" required></TextField>
                                <TextField value={password} onChange={({ target }) => setPassword(target.value)} size="small" type="password" label="password" variant="outlined" required></TextField>
                                <Button size="small" type="submit" variant="contained" color="primary">Login</Button>
                                <RegisterHandler setPage={setPage}></RegisterHandler>
                                {error !== null  ?
                                    <Alert severity="error">{error}</Alert> : <span></span>
                                }
                            </form>
                        </Container>
                    </Container>
                </>
                : <Register setPage={setPage} setUser={setUser} setBlogs={setBlogs} error={error} setError={setError}/>
            }
        </>
    )

}

Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired
}

export default Login