import axios from "axios";

const initApi = (AuthStore, ErrorStore) => {
    const api = axios.create({
        baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
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
                return await api.request(originalRequest);
            } catch (err) {
                AuthStore.setAccessToken('');
            }
        }
        if(error?.response?.status === 401) {
            AuthStore.setAccessToken('');
        } else {
            ErrorStore.setError(error)
        }
    });

    return api;
}

export default initApi;
