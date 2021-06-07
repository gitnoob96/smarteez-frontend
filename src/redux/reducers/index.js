import { combineReducers } from "redux";
import { postReducer } from "./postReducers"

const reducers = combineReducers({
    posts: postReducer
})

export default reducers