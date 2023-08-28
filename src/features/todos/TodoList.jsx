import { shallowEqual, useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";
import { selectTodoWithFilter } from "./TodoSlice";
import { ThreeDots } from "react-loader-spinner";
const TodoList = () => {
  const todosId = useSelector(selectTodoWithFilter, shallowEqual);
  const loading = useSelector((state) => state.todos.status);
  if (loading === "loading") {
    return (
      <div className="loading">
        <ThreeDots color="#ccc" />
      </div>
    );
  }
  if(loading === 'error'){
    return<div>Error Loading Todos</div>
  }

  const renderedListItems = todosId.map((id) => {
    return <TodoListItem key={id} id={id} />;
  });

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
