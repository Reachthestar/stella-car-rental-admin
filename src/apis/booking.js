import axios from "axios"


const bookingApi = {}

bookingApi.getAllBooking = () => axios.get('/')


export default bookingApi