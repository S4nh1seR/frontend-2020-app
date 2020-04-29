import {combineReducers, createStore} from "redux";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";
import articlesReducer from "./articlesReducer";

const reducers = combineReducers({
    app: appReducer,
    articlesPage: articlesReducer,
    form: formReducer
});

let store = createStore(reducers);
window.store = store;
export default store;