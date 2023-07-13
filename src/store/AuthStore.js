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

    login = async ({login, password}) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {login, password}, {withCredentials: true});
            const accessToken = response.data.accessToken;
            this.setAccessToken(accessToken);
        } catch (err) {
            console.log(err);
        }
    }

    register = async (user) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", user, {withCredentials: true});
            const accessToken = await response.data.accessToken;
            this.setAccessToken(accessToken);
        } catch (e) {
            console.log(e)
        }
    }

    logout = async () => {
        try {
            console.log(this.accessToken);
            await axios.post("http://localhost:8080/api/auth/logout", null, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
                withCredentials: true,
            });
            this.setAccessToken(null);
        } catch (e) {
            this.setAccessToken(null);
        }
    }

    refresh = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/refresh', null, {withCredentials: true});
            const accessToken = await response.data.accessToken;
            this.setAccessToken(accessToken);
        } catch (err) {
            console.log(err);
        }
    }

    get user () {
        if (!this.accessToken) {
            return null;
        }
        const [, payload,] = this.accessToken.split('.');

        if (!payload) {
            return null;
        }

        try {
            return JSON.parse(window.atob(payload));
        } catch(e) {
            return null
        }
    }

    get isLoggedIn () {
        return Boolean(this.user);
    }

    get isAdmin () {
        return Number(this.user?.role_id) === 2;
    }
}

export default AuthStore;
