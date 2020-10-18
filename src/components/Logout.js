import React from 'react'
import cookie from 'cookie_js'
import { useHistory } from 'react-router-dom'

const Logout = () => {
    const history = useHistory()
    cookie.remove('loggedBlogAppUser')
    history.push('/')
    window.location.reload(true)

    return (
        <div>

        </div>
    )
}

export default Logout