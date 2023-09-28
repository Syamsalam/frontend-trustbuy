import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
    baseURL: `http://192.168.1.43:8000/api`,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(
    async (config) => {
        // Ambil token dari AsyncStorage
        const userToken = await AsyncStorage.getItem('token');
        console.log(userToken)
        // Jika token ada, tambahkan ke header permintaan
        if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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

export const postAktif = (data,{headers}) => {
    return apiClient.get('/user/get-post-aktif',data, headers)
}

export const createPost = (data) => {
    return apiClient.post('/jastip/create-post',data)
}