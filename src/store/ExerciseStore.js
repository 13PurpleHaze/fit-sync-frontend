import {action, makeObservable, observable} from "mobx";


class ExerciseStore {
    exercises = [];
    api;

    constructor(api) {
        this.api = api;
        makeObservable(this,
            {
                exercises: observable,
                fetch: action,
                add: action,
                update: action,
                delete: action,
            })
    }
    fetch = async () => {
        const response =  (await this.api.get('/exercises')).data;
        this.exercises = response;
        console.log(response);
    }

    find = async (id) => {
        return await this.api.get(`/exercises/${id}`);
    }

    add = async (exercise) => {
        await this.api.post('/exercises', exercise);
        await this.get();
    }

    update = async (exercise_id, exercise) => {
        await this.api.patch(`/exercises/${exercise_id}`, exercise);
        await  this.get();
    }

    delete = async (exercise_id) => {
        await this.api.delete(`/exercises/${exercise_id}`);
        await this.get();
    }
}

export default ExerciseStore;
