import axios from "axios";


const initApi = (AuthStore) => {
    const api = axios.create({
        baseURL: 'http://localhost:8080/api',
        withCredentials: true,
    });

    api.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        return config;
    })

    api.interceptors.response.use(config => config, async error => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && error.config && !originalRequest?._isRetery) {
            originalRequest._isRetery = true;
            try {
                await AuthStore.refresh();
                //const response = await api.post('http://localhost:8080/api/auth/refresh');
                //const accessToken = response.data.accessToken;
                //AuthStore.setAccessToken(accessToken)
                return await api.request(originalRequest);
            } catch (err) {
                AuthStore.setAccessToken('');
            }
        }
        return Promise.reject(error);
    });

    return api;
}

export default initApi;
