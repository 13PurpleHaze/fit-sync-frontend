import {action, makeObservable, observable} from "mobx";

class UserStore {
    users = [];
    api;

    constructor(api) {
        this.api = api;
        makeObservable(this, {
            users: observable,
            fetch: action,
            add: action,
            block: action,
            unblock: action,
        })
    }

    fetch = async () => {
        const response = await  this.api.get("/users", {
            params: {
                limit: 100,
                sort: ['login']
            }
        });
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
