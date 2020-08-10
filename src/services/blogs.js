import axios from 'axios'
const baseUrl = '/api/blogs'
// const baseUrl = 'http://localhost:3001/blogs'

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject =>{
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response
}

const getUserBlogs = async () =>{
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.get(baseUrl, config)
  return response.data

}

export default { getAll, setToken, create, getUserBlogs}