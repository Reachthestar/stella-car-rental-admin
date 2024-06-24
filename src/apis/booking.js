import axios from '../config/axios'

const bookingApi = {}

bookingApi.getAllBooking = () => axios.get('/admin/bookings')
bookingApi.updateBookingStatus = (bookingId,status) => axios.patch(`/admin/bookings/bookingId/${bookingId}`,{status})


export default bookingApi