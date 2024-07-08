import axios from '../config/axios'

const bookingApi = {}

bookingApi.getAllBooking = () => axios.get('/admin/bookings')
bookingApi.updateBookingStatus = (bookingId,status) => axios.patch(`/admin/bookings/bookingId/${bookingId}`,{status})
bookingApi.getBookingByPage = (currentPage , cardPerPage) => axios.get(`/admin/bookings/page/${currentPage}?cardPerPage=${cardPerPage}`)
bookingApi.getAllBookingCount = () => axios.get('/admin/bookings/count')

export default bookingApi