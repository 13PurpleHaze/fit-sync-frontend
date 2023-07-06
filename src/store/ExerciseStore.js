import {action, makeObservable, observable} from "mobx";
import api from "../utils/api";


class ExerciseStore {
    exercises = [];

    constructor() {
        makeObservable(this,
            {
                exercises: observable,
                get: action,
                add: action,
                update: action,
                delete: action,
            })
    }
    get = async () => {
        this.exercises = await (await api.get('/exercises')).data;
    }

    find = async (id) => {
        return await api.get(`/exercises/${id}`);
    }

    add = async (exercise) => {
        await api.post('/exercises', exercise);
        await this.get();
    }

    update = async (exercise_id, exercise) => {
        await api.patch(`/exercises/${exercise_id}`, exercise);
        await  this.get();
    }

    delete = async (exercise_id) => {
        await api.delete(`/exercises/${exercise_id}`);
        await this.get();
    }
}

export default ExerciseStore;
