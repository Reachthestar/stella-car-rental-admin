import axios from '../config/axios'

const carsApi = {}

carsApi.getAllCar = () => axios.get('/admin/cars')
carsApi.updateCar = (carId,data) => axios.patch(`/admin/cars/carId/${carId}`,data)

export default carsApi