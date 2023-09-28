import axios from 'axios'

const apiClient = axios.create({
    baseURL: `http://192.168.1.43:8000/api`,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export const loginApi = (data) => {
    return apiClient.post('/login', data)
}

export const registerApi = (data) => {
    return apiClient.post('/register', data)
}

export const registerJastpApi = (data) => {
    return apiClient.post('/register-jastip', data)
}

export const profileApi = (data) => {
    return apiClient.get('/profile', data)
}

export const postAktif = (data) => {
    return apiClient.get('/user/get-post-aktif',data)
}