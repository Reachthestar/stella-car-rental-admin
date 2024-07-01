import axios from '../config/axios'

const carsApi = {}

carsApi.getAllCar = () => axios.get('/admin/cars')
carsApi.updateCar = (carId,data) => axios.patch(`/admin/cars/carId/${carId}`,data)
carsApi.getAllCarModel = () => axios.get('/admin/cars/model')
carsApi.getAllBranches = () => axios.get('/admin/branches')
carsApi.createCar = (data) => axios.post('/admin/cars',data)
carsApi.deleteCar = (carId) => axios.delete(`/admin/car/${carId}`)

export default carsApi