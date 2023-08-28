import { combineReducers } from "redux";
import todosReduser from "./features/todos/TodoSlice"
import {filterReducer} from "./features/filter/filterSlice"

export const rootReducer = combineReducers({
    todos : todosReduser,
    filters :filterReducer
})

