import ExerciseStore from "./ExerciseStore.js";
import UserStore from "./UserStore";
import AuthStore from "./AuthStore";
import RouterStore from "./RouterStore";
import WorkoutStore from "./WorkoutStore";
import ActiveUsersStore from "./ActiveUsersStore";
import React from "react";
import initApi from "../utils/api";
import {io} from "socket.io-client";
import {reaction} from "mobx";
import SessionStore from "./SessionStore";
import {useNavigate} from "react-router-dom";
import {createBrowserHistory} from "history";
import ErrorStore from "./ErrorStore";

export const StoreContext = React.createContext(null);

export class Store {
    ExerciseStore;
    UserStore;
    AuthStore;
    RouterStore;
    WorkoutStore;
    SessionStore;
    ActiveUsersStore;
    socket

    constructor() {
        const history = createBrowserHistory();
        this.RouterStore = new RouterStore(history);
        this.AuthStore = new AuthStore();

        this.socket = io(process.env.REACT_APP_SERVER_URL, {
            transports: ['websocket'],
            auth: {
                token: this.AuthStore?.accessToken,
            },
        });

        this.socket.on('connect', ()=> {
            console.log('connect')
        })

        let attempt = false;
        this.socket.on('connect_error', async (e) => {
            try {
                if(!attempt) {
                    attempt = true;
                    console.log(attempt)
                    await this.AuthStore.refresh();
                    this.socket.auth.token = this.AuthStore?.accessToken;
                } else {
                    console.log(e)
                    this.socket.disconnect();
                }
            } catch (err) {
                console.log(err)
            }
        })

        reaction(() => this.AuthStore.accessToken, () => {
                console.log('recconnect')
                this.socket.disconnect();
                this.socket.auth.token = this.AuthStore?.accessToken;
                this.socket.connect();
            }
        );
        this.ErrorStore = new ErrorStore(this.socket);
        const api = initApi(this.AuthStore, this.ErrorStore);

        this.WorkoutStore = new WorkoutStore(api, this.AuthStore);

        this.ExerciseStore = new ExerciseStore(api);
        this.UserStore = new UserStore(api);
        this.SessionStore = new SessionStore(api, this.socket, this.RouterStore, this.AuthStore);
        this.ActiveUsersStore = new ActiveUsersStore(this.socket, this.AuthStore);
    }
}
