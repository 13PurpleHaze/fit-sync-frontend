import {action, makeObservable, observable} from "mobx";

class SessionStore {
    session = null;
    isStarted = false;
    isFinished = false;
    messages = [];
    api;
    RouterStore;
    AuthStore;

    constructor(api, socket, RouterStore, AuthStore) {
        this.isStarted = localStorage.getItem('isStarted') || false;
        this.isFinished = localStorage.getItem('isFinished') || false;
        this.api = api;
        this.socket = socket;
        this.RouterStore = RouterStore;
        this.AuthStore = AuthStore;

        this.socket.on('session:created', session => this.created(session));
        this.socket.on('session:done-exs', ({userId, reps, exerciseId}) => this.doneExs({userId, reps, exerciseId}));
        this.socket.on('message:sent', message => this.sent(message));
        this.socket.on('users:accepted', user => this.accepted(user));
        this.socket.on('session:finished', () => this.finished());

        makeObservable(this, {
            session: observable,
            messages: observable,
            isStarted: observable,
            isFinished: observable,
            create: action,
            created: action,
            doExs: action,
            doneExs: action,
            send: action,
            sent: action,
            accepted: action,
            start: action,
            finish: action,
            finished: action,
        });
    }

    create = (workout) => {
        this.workout = workout;
        this.socket.emit('session:create', workout);
    }

    accepted = (user) => {
        this.session.users.push(user);
    }

    created = async (session) => {
        this.session = session;
        this.messages = [];
        this.isFinished = false;
        this.isStarted = false;
        localStorage.removeItem('isStarted')
        localStorage.removeItem('isFinished')
        this.RouterStore.push(`/session/${session.session_id}`);
    }

    doExs = (reps, exerciseId) => {
        this.socket.emit('session:do-exs', {reps, exerciseId, sessionId: this.session.session_id});
    }

    doneExs = ({userId, reps, exerciseId}) => {
        const indexUser = this.session.users.findIndex(user => user.user_id === userId);
        const indexResult = this.session.users[indexUser].results.findIndex(result => Object.keys(result)[0] === String(exerciseId));
        this.session.users[indexUser].results[indexResult][exerciseId] = reps;
    }


    send = (text) => {
        this.socket.emit('message:send', {session: this.session, user_id: this.AuthStore.user.user_id, text})
    }

    sent = (message) => {
        this.messages.push(message)
    }

    start = () => {
        this.socket.emit('session:start', this.session);
        this.isStarted = true;
        localStorage.setItem('isStarted', 'true');
    }

    finish = () => {
        this.isFinished = true;
        localStorage.setItem('isStarted', '');
        localStorage.setItem('isFinished', 'true');
        this.socket.emit('session:finish', this.session);
        this.RouterStore.push('/workouts');
    }

    finished = () => {
        this.RouterStore.push("/workouts");
    }
}

export default SessionStore;
