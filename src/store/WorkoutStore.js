import {action, makeObservable, observable} from "mobx";
import workout from "../pages/Workout";

class WorkoutStore {
    workouts = [];
    workout = null;
    history = [];
    totalCount = 0;
    AuthStore;

    constructor(api, AuthStore, ErrorStore) {
        this.api = api;
        this.AuthStore = AuthStore;
        makeObservable(this, {
            workouts: observable,
            workout: observable,
            history: observable,
            totalCount: observable,
            fetch: action,
            addWorkout: action,
            delete: action,
            update: action,
            fetchHistory: action,
        });
    }

    fetch = async ({limit = 10, page = 1, sort = ['title'], filters = []}) => {
        console.log(limit);
        const response = await this.api.get('/workouts', {
            params: {
                filters: [{
                    user_id: this.AuthStore?.user.user_id
                }],
                sort,
                limit,
                page,
            }
        });
        console.log(response)
        this.totalCount = response.headers['x-total-count'];
        this.workouts = response.data;
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
        await this.fetch({});
    }

    fetchHistory = async ({limit = 10, page = 1, sort = ['title'], filters = []}) => {
        const response = await this.api.get('/history', {
            params: {
                limit,
                sort,
                filters,
                page
            }
        });
        this.totalCount = response?.headers['x-total-count'];
        this.history = response.data;
    }
}

export default WorkoutStore;
