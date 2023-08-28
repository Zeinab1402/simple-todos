// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import store from "./store"
// import { Provider } from "react-redux";
// import { fetchTodos } from "./features/todos/TodoSlice";

// store.dispatch(fetchTodos)

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store ={store}>
//       <App/>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store"
import { fetchTodos } from "./features/todos/TodoSlice";

store.dispatch(fetchTodos)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
