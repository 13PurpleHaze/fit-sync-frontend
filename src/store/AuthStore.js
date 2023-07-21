import {action, computed, makeObservable, observable} from "mobx";
import axios from "axios";

class AuthStore {
    accessToken = '';

    constructor() {
        this.accessToken = localStorage.getItem('accessToken');
        makeObservable(this, {
            accessToken: observable,
            register: action,
            login: action,
            logout: action,
            refresh: action,
            setAccessToken: action,
            isLoggedIn: computed,
            user: computed,
            isAdmin: computed,
        })
    }

    setAccessToken = (token) => {
        if (token) {
            this.accessToken = token;
            localStorage.setItem('accessToken', token);
        } else {
            localStorage.removeItem('accessToken');
            this.accessToken = '';
        }
    }

    login = async (login, password) => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, {
            login,
            password
        }, {withCredentials: true});
        const accessToken = response.data.accessToken;
        this.setAccessToken(accessToken);
    }

    register = async (user) => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/register`, user, {withCredentials: true});
        const accessToken = await response.data.accessToken;
        this.setAccessToken(accessToken);
    }

    logout = async () => {
        try {
            await this.refresh();
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`, null, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
                withCredentials: true,
            });
            this.setAccessToken(null);
        } catch (error) {
            this.setAccessToken(null);
        }
    }

    refresh = async () => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/refresh`, null, {withCredentials: true});
        const accessToken = await response.data.accessToken;
        this.setAccessToken(accessToken);
    }

    get user() {
        if (!this.accessToken) {
            return null;
        }
        const [, payload,] = this.accessToken.split('.');

        if (!payload) {
            return null;
        }

        try {
            return JSON.parse(window.atob(payload));
        } catch (error) {
            return null
        }
    }

    get isLoggedIn() {
        return Boolean(this.user);
    }

    get isAdmin() {
        return Number(this.user?.role_id) === Number(process.env.REACT_APP_ROLE_ADMIN);
    }
}

export default AuthStore;
