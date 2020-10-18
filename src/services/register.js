import axios from 'axios'
const baseurl = '/api/login'


const registerUser = async (userObject) => {
    const response = await axios.post(baseurl, userObject)
    return response.data
}

export default { registerUser }