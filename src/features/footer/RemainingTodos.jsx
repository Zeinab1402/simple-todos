import { useSelector } from "react-redux";
import { selectTodos } from "../todos/TodoSlice";

const RemainingTodos = () => {
  const count = useSelector(state=>{const todos= selectTodos(state).filter(
    todo=>!todo.completed)
    return todos.length }
    );
  
  const suffix = count === 1 ? "" : "s";

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  );
};

export default RemainingTodos;
