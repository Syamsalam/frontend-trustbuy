import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseURL = "http://192.168.0.103:8000/api"

const apiClient = axios.create({
    baseURL: `http://192.168.0.103:8000/api`,
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
    return apiClient.get('/user/profile',data)
}

export const detailProfile = (data) => {
    return apiClient.get('/user/detail-profile',data)
}
export const detailProfileJastip = (data) => {
    return apiClient.get('/jastip/detail-profile',data)
}

export const postAktif = () => {
    return apiClient.get('/user/get-post-aktif')
}

export const createPost = (data) => {
    return apiClient.post('/jastip/create-post',data)
}

export const getProfile = (data) => {
    return apiClient.get('/common/photo-profile',data)
}

export const updateUser = (data) => {
    return apiClient.put('/user/update-user',data)
}
export const updateJastip = (data) => {
    return apiClient.put('/jastip/update-user',data)
}

export const getCommonProfile = (data) => {
    return apiClient.get('/common/profile',data)
}

export const getOrderStatus = (data) => {
    return apiClient.get('/jastip/order-titip',data)
}

export const updateOrderStatus = (data) => {
    return apiClient.put('/jastip/update-titip',data)
}

export const deleteOrder = (data) => {
    return apiClient.delete(`/jastip/delete-order/${data}`)
}

export const addOrderItems = (data) => {
    return apiClient.post('/jastip/create-order-items',data)
}

export const getOrderItems = (data) => {
    return apiClient.get(`/jastip/order-items/${data}` )
}

export const getBiayaJastip = (data) => {
    return apiClient.get(`/jastip/biaya-jastip/${data}`)
}

export const createOrder = (data) => {
    return apiClient.post('/user/create-order', data)
}

export const getPostJastip = (data) => {
    return apiClient.get('/jastip/get-post',data)
}

export const getJastipById = (id) => {
    return apiClient.get(`/jastip/get-post/${id}`)
}

export const updatePost = (data) => {
    return apiClient.put('/jastip/update-post',data)
} 

export const postImage = async (data) => {
    const name = data.split("/").at(-1)
    const ext = name.split(".").at(-1)
    const formData = new FormData()
    formData.append("image", {
        uri : data,
        name : name,
        type : "image/"+ext,
        
    })
    console.log(data)
    
    const userToken = await AsyncStorage.getItem('token');
    
    return  await fetch(baseURL+'/common/upload-profile', {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization" :  `Bearer ${userToken}`
        },
        body : formData,
        method : "POST",
      });
    // return axios.post(baseURL+'/common/upload-profile', formData, {
    //     headers : {
    //         "Content-Type" : "multi"
    //     }
    // })
}