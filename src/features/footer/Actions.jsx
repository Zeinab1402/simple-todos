import { useDispatch, useSelector } from "react-redux";
import {saveMarkAllCompleted, saveClearCompleted} from "../todos/TodoSlice"



function Actions() {
const todos = useSelector(state =>state.todos.intities)

    const dispatch = useDispatch()
    const onMarkAllCompleted =()=>{ Object.values(todos).forEach((todo) =>{
       dispatch(saveMarkAllCompleted(todo))
    })}
    const onClearCompleted=()=>{
      Object.values(todos).forEach((todo) =>{
        if(todo.completed){
          dispatch(saveClearCompleted(todo.id))
        }
      })}
  return (
    <div className="actions">
      <h5>Actions</h5>
      <button onClick={onMarkAllCompleted} className="button">Mark All Completed</button>
      <button onClick={onClearCompleted} className="button">Clear Completed</button>
    </div>
  );
}

export default Actions;
