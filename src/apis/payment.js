import axios from '../config/axios'

const paymentApi = {}

paymentApi.getAllPayment = () => axios.get('/admin/payments')

export default paymentApi