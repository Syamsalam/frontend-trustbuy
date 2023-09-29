import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
    baseURL: `http://10.3.101.246:8000/api`,
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
        // console.log(userToken)
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
    return apiClient.get('/user/photo-profile',data)
}

export const detailProfile = (data) => {
    return apiClient.get('/user/detail-profile',data)
}

export const postAktif = () => {
    return apiClient.get('/user/get-post-aktif')
}

export const createPost = (data) => {
    return apiClient.post('/jastip/create-post',data)
}

export const getPhoto = (data) => {
    return apiClient.get('/user/photo-profile',data)
}

export const updateUser = (data) => {
    return apiClient.put('/user/update-user',data)
}