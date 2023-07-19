import {action, makeObservable, observable} from "mobx";
import workout from "../pages/Workout";

class WorkoutStore {
    workouts = [];
    workout = null;
    history = [];
    AuthStore;

    constructor(api, AuthStore, ErrorStore) {
        this.api = api;
        this.AuthStore = AuthStore;
        makeObservable(this, {
            workouts: observable,
            workout: observable,
            history: observable,
            fetch: action,
            addWorkout: action,
            delete: action,
            update: action,
            getHistory: action,
        });
    }

    fetch = async () => {
        const response = await this.api.get('/workouts', {
            params: {
                filters: [{
                    user_id: this.AuthStore.user.user_id
                }],
                sort: ['title'],
                limit: 100
            }
        });
        this.workouts = response?.data;
    }

    find = async (workoutId) => {
        this.workout = (await this.api.get(`/workouts/${workoutId}`)).data;
    }

    add = async (workout) => {
        await this.api.post("/workouts", workout);
    }

    addWorkout = (workout) => {
        this.workout = workout;
    }

    update = async (workoutId, workout) => {
        await this.api.patch(`/workouts/${workout.workout_id}`, workout);
    }

    delete = async (workoutId) => {
        await this.api.delete(`/workouts/${workoutId}`);
        await this.fetch();
    }

    getHistory = async () => {
        const response = await this.api.get('/history')
        this.history = response.data;
    }
}

export default WorkoutStore;
