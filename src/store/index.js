import ExerciseStore from "./ExerciseStore.js";
import UserStore from "./UserStore";
import AuthStore from "./AuthStore";
import RouterStore from "./RouterStore";
import WorkoutStore from "./WorkoutStore";
import React from "react";
import initApi from "../utils/api";
import { io } from "socket.io-client";
import {reaction} from "mobx";
import SessionStore from "./SessionStore";
import {useNavigate} from "react-router-dom";
import {createBrowserHistory} from "history";

export const StoreContext = React.createContext(null);
export class Store {
    ExerciseStore;
    UserStore;
    AuthStore;
    RouterStore;
    WorkoutStore;
    SessionStore;
    socket
    constructor() {
        const history = createBrowserHistory();
        this.RouterStore = new RouterStore(history);
        this.AuthStore = new AuthStore();
        const api = initApi(this.AuthStore);

        this.socket = io("http://localhost:8080", {
            transports: ['websocket'],
            auth: {
                token: this.AuthStore?.accessToken,
            },
        });

        this.socket.on("connect_error", (err) => {
            console.log('error socket', err)
        });

        this.socket.io.on(
            'reconnect_attempt',
            () => {
                console.log('recconnect')
                this.socket.io.auth = {
                    Authorization: this.AuthStore?.accessToken,
                };
            }
        );

        reaction(
            () => this.AuthStore.accessToken,
            () => {
                console.log("переподключение");
                if (this.socket) {
                    console.log("Socket before disconnect:", this.socket);
                    this.socket.disconnect();
                    this.socket.connect();
                } else {
                    console.log("Socket is undefined");
                }
            }
        );

        this.WorkoutStore = new WorkoutStore(api, this.AuthStore);

        this.ExerciseStore = new ExerciseStore(api);
        this.UserStore = new UserStore(api);
        this.SessionStore = new SessionStore(api, this.socket, this.RouterStore);
    }
}
