import axios from 'axios'

const API_URL = 'http://localhost:8080/conductores'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const driversService = {
  createDriver(driverData) {
    return axiosInstance.post('/registrar', driverData)
  }
}
