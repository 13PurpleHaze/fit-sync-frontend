import {action, makeObservable, observable} from "mobx";

class ActiveUsersStore {
    users = [];
    invitation = null;
    awaitTimeout = false;
    AuthStore;
    socket;

    constructor(socket, AuthStore) {
        this.socket = socket;
        this.AuthStore = AuthStore;
        this.socket.on('active-users:get', users => this.getActiveUsers(users));
        this.socket.on('active-users:invited', data => this.invited(data))
        makeObservable(this, {
            users: observable,
            invitation: observable,
            awaitTimeout: observable,
            getActiveUsers: action,
            invite: action,
            invited: action,
            accept: action,
            reject: action,
        })
    }

    getActiveUsers = (users) => {
        this.users = users;
    }

    invite = (session, to) => {
        this.socket.emit('active-users:invite', {session, from: this.AuthStore.user, to});
        this.awaitTimeout = true;
        this.awaitTimeout = setTimeout(
            () => {
                this.awaitTimeout = false;
            },
            500
        );
    }

    invited = ({session, from, to}) => {
        this.invitation = {session, from, to};
    }

    accept = () => {
        this.socket.emit('active-users:accept', this.invitation);
        this.invitation = null;
    }

    reject = () => {
        this.socket.emit('active-users:reject', this.invitation);
        this.invitation = null;
    }
}

export  default  ActiveUsersStore
