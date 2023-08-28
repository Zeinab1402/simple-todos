import { useDispatch, useSelector } from "react-redux";
import {deleteTodoItem, saveChandeColorOption, toggledTodoItem } from "./TodoSlice";
import { ReactComponent as TimesSolid } from "./times-solid.svg";

export const availableColors = ["green", "blue", "orange", "purple", "red"];
export const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

const TodoListItem = ({ id }) => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.intities[id]);
  const { text, completed, color } = todo;

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ));

  const deletTodoItem = () => {
    dispatch(deleteTodoItem(todo.id));
  };
  const checkedItem = () => {
    dispatch(toggledTodoItem(todo));
  };
  const handlerChangeColorOption = (e) => {
    dispatch(saveChandeColorOption(todo.id, e.target.value));
  };

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={checkedItem}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            defaultValue={color}
            style={{ color }}
            onChange={handlerChangeColorOption}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button onClick={deletTodoItem} className="destroy">
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
