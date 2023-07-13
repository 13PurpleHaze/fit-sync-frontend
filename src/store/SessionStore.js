import {action, makeObservable, observable} from "mobx";
import api from "../utils/api";
import {useNavigate} from "react-router-dom";
import {create} from "axios";

class SessionStore {
    session = null;
    workout = null;
    api;
    constructor(api, socket, RouterStore) {
        this.api = api;
        this.socket = socket;
        this.RouterStore = RouterStore;
        this.socket.on('session:created', session => this.created(session));
        makeObservable(this, {
            session: observable,
            workout:observable,
            create: action,
            created: action,
            fetcExercses: action,
        });
    }

    create = (workoutId) => {
        this.socket.emit('session:create', {workoutId});
    }

    created = (session) => {
        this.session = session
        this.RouterStore.push(`/session/${session.session_id}`);
        this.fetcExercses(session);
    }

    init = () => {

    }

    fetcExercses = async (session) => {
        const response = await this.api.get(`/workouts/${session.workout_id}/exercises`);
        this.workout = response.data;
    }
}

export default SessionStore;
