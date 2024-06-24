import axios from '../config/axios'

const authApi = {}

authApi.login = (body) => axios.post('/admin/auth/login',body)
authApi.getAdmin = () => axios.get('/admin/auth/me')

export default authApi