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
        try {
            const response =  (await this.api.get('/exercises')).data;
            this.exercises = response;
        } catch (err) {
            console.log(err);
        }
    }

    find = async (id) => {
        return await this.api.get(`/exercises/${id}`);
    }

    add = async (exercise) => {
        await this.api.post('/exercises', exercise);
        await this.fetch();
    }

    update = async (exerciseId, exercise) => {
        await this.api.patch(`/exercises/${exerciseId}`, exercise);
    }

    delete = async (exercise_id) => {
        try {
            await this.api.delete(`/exercises/${exercise_id}`);
            await this.fetch()
        } catch (error) {
            console.log(error);
        }
    }
}

export default ExerciseStore;
