import axios from '../config/axios'

const paymentApi = {}

paymentApi.getAllPayment = () => axios.get('/admin/payments')
paymentApi.deletePayment = (bookingId) => axios.delete(`/admin/booking/${bookingId}`)

export default paymentApi