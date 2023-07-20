import {action, makeObservable, observable} from "mobx";

class UserStore {
    users = [];
    totalCount = 0;
    api;

    constructor(api) {
        this.api = api;
        makeObservable(this, {
            users: observable,
            totalCount: observable,
            fetch: action,
            add: action,
            block: action,
            unblock: action,
        })
    }

    fetch = async ({limit = 10, sort = ['login'], page = 1}) => {
        const response = await  this.api.get("/users", {
            params: {
                limit,
                sort,
                page
            }
        });
        this.totalCount = response.headers['x-total-count'];
        this.users = await response.data;
    }

    add = async (user) => {
        await this.api.post("/users", user);
        await this.fetch();
    }

    block = async (user_id) => {
        const user = this.users.find(user => user.user_id === user_id);
        if(!user) {
            return;
        }
        user.status = false;
        user.updated_at = new Date();
        await this.api.patch(`/users/${user_id}/block`);
    }

    unblock = async  (user_id) => {
        const user = this.users.find(user => user.user_id === user_id);
        if(!user) {
            return;
        }

        user.status = true;
        user.updated_at = new Date();
        await this.api.patch(`/users/${user_id}/unblock`);
    }
}

export default UserStore;
