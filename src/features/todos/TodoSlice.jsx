/* eslint-disable array-callback-return */
/* eslint-disable default-case */

import { produce } from "immer";
import { StatusFilters } from "../filter/filterSlice";
import { createSelector } from "reselect";
import { client } from "../../api/client";
const initState = {
  intities: {},
  status: "idel",
};

const todosReduser = produce((state, action) => {
  switch (action.type) {
    case "todos/todoAdded":
      const todo = action.payload;
      state.intities[todo.id] = todo;
      break;
    case "todos/todoToggled":
      const toogledTodoId = action.payload;
      state.intities[toogledTodoId].completed =
        !state.intities[toogledTodoId].completed;
      break;
    case "todos/todoDeleted":
      const deleteTodoId = action.payload;
      delete state.intities[deleteTodoId];
      break;
    case "todos/markAllCompleted":
      Object.values(state.intities).forEach((todo) => {
        state.intities[todo.id].completed = true;
      });
      break;
    case "todos/clearCompleted":
      Object.values(state.intities).forEach((todo) => {
        if (todo.completed) {
          delete state.intities[todo.id];
        }
      });
      break;
    case "todos/changeColorOption":
      const { id, color } = action.payload;
      state.intities[id].color = color;
      break;
    case "todos/todoLoading":
      state.status = "loading";
      break;
    case "todos/todosLoaded":
      const todos = action.payload;
      const initIntities = {};
      todos.forEach((todo) => {
        initIntities[todo.id] = todo;
      });
      state.intities = initIntities;
      state.status = "idel";
      break;
    case "todos/lodeedError":
      state.status = "error";
  }
}, initState);
export default todosReduser;

export const todoAdded = (todo) => {
  return {
    type: "todos/todoAdded",
    payload: todo,
  };
};

export const todoToggled = (todoId) => ({
  type: "todos/todoToggled",
  payload: todoId,
});

export const todoDeleted = (todoId) => ({
  type: "todos/todoDeleted",
  payload: todoId,
});

export const markAllCompleted = () => ({
  type: "todos/markAllCompleted",
});

export const clearCompleted = () => ({
  type: "todos/clearCompleted",
});

export const changeColorOption = (todoId, color) => ({
  type: "todos/changeColorOption",
  payload: {
    id: todoId,
    color,
  },
});

export const todosLoaded = (todos) => ({
  type: "todos/todosLoaded",
  payload: todos,
});

//tunk function
export const saveNewTodo = (text) => {
  return async function saveNewTodoThunk(dispatch) {
    const initTodo = {
      text,
      completed: false,
    };
    const todo = await client.post("http://localhost:5000/todos", initTodo);
    dispatch(todoAdded(todo));
  };
};
export const deleteTodoItem = (todoId) => {
  return async function saveDeletTodoThunk(dispatch) {
    await client.delete(`http://localhost:5000/todos/${todoId}`);
    // console.info("reponse of delete", JSON.stringify(todo))
    dispatch(todoDeleted(todoId));
  };
};
export const toggledTodoItem = (todo) => {
  return async function saveToggledTodoItem(dispatch) {
    await client.put(`http://localhost:5000/todos/${todo.id}`, {
      ...todo,
      completed: !todo.completed,
    });
    dispatch(todoToggled(todo.id));
  };
};
export const fetchTodos = (dispatch) => {
  dispatch({ type: "todos/todoLoading" });
  client
    .get("http://localhost:5000/todos")
    .then((todos) => {
      dispatch(todosLoaded(todos));
    })
    .catch((error) =>
      dispatch({
        type: "todos/lodeedError",
      })
    );
};
export const saveChandeColorOption=(id ,color)=>{  
  return async function saveChandeColorOptionThunk(dispatch,getState){
    const item = getState().todos.intities[id]
    await client.put(`http://localhost:5000/todos/${id}`,
    {...item ,color :color})
    dispatch(changeColorOption(id ,color))
  }
}
export const saveClearCompleted = (id) => {
  return async function saveDeletTodoThunk(dispatch) {
      await client.delete(`http://localhost:5000/todos/${id}`,);
    // console.info("reponse of delete", JSON.stringify(todo))
    dispatch(clearCompleted());
  };
};
export const saveMarkAllCompleted=(todo)=>{
  return async function saveMarkAllCompletedThunk(dispatch){
    await client.put(`http://localhost:5000/todos/${todo.id}`,{
      ...todo,
      completed:true
    })
    dispatch(markAllCompleted())
  }
}

export const selectTodosIds = (state) => Object.keys(state.todos.intities);
export const selectTodosIntities = (state) => state.todos.intities;
export const selectTodos = createSelector(selectTodosIntities, (items) =>
  Object.values(items)
);

const selectFilterTodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {
    const { statuses, colors } = filters;

    const showAll = statuses === StatusFilters.All;

    if (showAll && colors.length === 0) {
      return todos;
    }
    const showCompleted = statuses === StatusFilters.Compeleted;
    return todos.filter((todo) => {
      const StatusFilter = showAll || todo.completed === showCompleted;
      const ColorFilter = colors.length === 0 || colors.includes(todo.color);
      return StatusFilter && ColorFilter;
    });
  }
);

export const selectTodoWithFilter = createSelector(
  selectFilterTodos,
  (filterTodos) => filterTodos.map((todo) => todo.id)
);
