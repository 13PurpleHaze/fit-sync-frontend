import {action, makeObservable, observable} from "mobx";

class ErrorStore {
    error = null;
    socket;

    constructor(socket) {
        this.socket = socket;
        this.socket.on('error', error => this.setError(error))
        makeObservable(this, {
            error: observable,
            setError: action,
            resetError: action,
        })
    }

    setError = (error) => {
        this.error = error;
    }

    resetError = () => {
        this.error = null;
    }
}

export default ErrorStore;
