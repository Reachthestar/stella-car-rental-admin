import axios from '../config/axios'

const customerApi = {}

customerApi.getAllCustomer = () => axios.get('/admin/customers')

export default customerApi