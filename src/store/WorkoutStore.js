import {action, makeObservable, observable} from "mobx";
import workout from "../pages/Workout";

class WorkoutStore {
    workouts = [];
    workout = null;
    AuthStore;

    constructor(api, AuthStore) {
        this.api = api;
        this.AuthStore = AuthStore;
        makeObservable(this, {
            workouts: observable,
            workout: observable,
            fetch: action,
            addWorkout: action,
            delete: action,
            update: action,
        });
    }

    fetch = async () => {
        const response = await this.api.get('/workouts', {
            params : {
                filters: [{
                    user_id: this.AuthStore.user.user_id
                }],
                sort: ['title'],
                limit: 100
            }});
        this.workouts = await response.data;
    }

    add = async (workout) => {
        await this.api.post("/workouts", workout);
    }

    addWorkout = (workout) => {
        this.workout = workout;
    }

    update = async (workout) => {
        await this.api.patch(`/workouts/${workout.workout_id}`, workout);
    }

    delete = async (workoutId) => {
        await this.api.delete(`/workouts/${workoutId}`);
        await this.fetch();
    }
}

export default WorkoutStore;
