import ExerciseStore from "./ExerciseStore.js";
import React from "react";

export const StoreContext = React.createContext(null);
export class Store {
    ExerciseStore;
    constructor() {
        this.ExerciseStore = new ExerciseStore();
    }
}
