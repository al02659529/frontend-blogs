import React from 'react'
import { Button, TextField , Typography, Container } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}



const Login = props => {
  let { username, password, setUsername, setPassword, handleLogin, error } = props

  return (
    <Container>
      <Typography paragraph align="center" variant='h3' color="primary">Bloggie</Typography>
      <Container>
        <form id="loginForm" onSubmit={handleLogin}>
          <TextField value={username} onChange={({ target }) => setUsername(target.value)} size="small" label="username" variant="outlined" required></TextField>
          <TextField value={password} onChange={({ target }) => setPassword(target.value)} size="small" type="password" label="password" variant="outlined" required></TextField>
          <Button size="small" type="submit" variant="contained" color="primary">Login</Button>
          {error !== null  ?
            <Alert severity="error">{error}</Alert> : <span></span>
          }
        </form>

      </Container>
    </Container>
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