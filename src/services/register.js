import axios from 'axios'
// const baseurl = '/api/login'
const baseurl = 'http://localhost:3003/api/users'

const registerUser = async (userObject) => {
    const response = await axios.post(baseurl, userObject)
    return response.data
}

export default {registerUser}