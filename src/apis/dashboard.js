import axios from '../config/axios'

const dashboardApi = {}

dashboardApi.getDashboardData = () => axios.get('/admin/dashboard')

export default dashboardApi