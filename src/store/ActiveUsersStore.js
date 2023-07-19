import {action, makeObservable, observable} from "mobx";

class ActiveUsersStore {
    users = [];
    invitation = null;
    awaitTimeout = false;
    constructor(socket, AuthStore) {
        this.socket = socket;
        this.AuthStore = AuthStore;
        this.socket.on('active-users:get', (users) => {this.getActivePlayers(users)});
        this.socket.on('active-users:invited', (data) => {this.invited(data)})
        this.socket.on('active-users:rejected', data => this.rejected(data));
        makeObservable(this, {
            users: observable,
            invitation: observable,
            awaitTimeout: observable,
            getActivePlayers: action,
            invite: action,
            invited: action,
            accept: action,
            reject: action,
        })
    }

    getActivePlayers = (users) => {
        this.users = users;
    }

    invite = (session, toSocketId) => {
        this.socket.emit('active-users:invite', {session, from: this.AuthStore.user, toSocketId});

        this.awaitTimeout = true;
        this.awaitTimeout = setTimeout(
            () => {
                this.awaitTimeout = false;
            },
            15000
        );
    }

    invited = ({session, from, toSocketId}) => {
        this.invitation = {session, from, toSocketId};
    }

    accept = () => {
        this.socket.emit('active-users:accept', this.invitation);
        this.invitation = null;
    }

    reject = () => {
        this.socket.emit('active-users:reject', this.invitation);
        this.invitation = null;
        this.awaitTimeout = false;
    }
}

export  default  ActiveUsersStore
