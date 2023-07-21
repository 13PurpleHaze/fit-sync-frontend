import {action, makeObservable, observable} from "mobx";

class ExerciseStore {
    exercises = [];
    totalCount = 0;
    api;

    constructor(api) {
        this.api = api;
        makeObservable(this,
            {
                exercises: observable,
                totalCount: observable,
                fetch: action,
                add: action,
                update: action,
                delete: action,
            })
    }
    fetch = async ({limit = 10, page = 1, sort = ['title'], filters = []}) => {
        const response =  await this.api.get('/exercises', {
            params: {
                limit,
                page,
                filters,
                sort
            }
        });
        this.totalCount = response?.headers['x-total-count'];
        this.exercises = response?.data;
    }

    find = async (id) => {
        return await this.api.get(`/exercises/${id}`);
    }

    add = async (exercise) => {
        await this.api.post('/exercises', exercise);
        await this.fetch({});
    }

    update = async (exerciseId, exercise) => {
        await this.api.patch(`/exercises/${exerciseId}`, exercise);
    }

    delete = async (exercise_id) => {
        await this.api.delete(`/exercises/${exercise_id}`);
        await this.fetch({})
    }
}

export default ExerciseStore;
