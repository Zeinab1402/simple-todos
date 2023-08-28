import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "./reducer"
import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

const composed = composeWithDevTools(applyMiddleware(thunk))
 const store = createStore(rootReducer,composed) 

 export default store