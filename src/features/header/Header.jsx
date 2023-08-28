import { useState } from "react";
import { saveNewTodo } from "../todos/TodoSlice";
import { useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

export default function Header() {
  const [text, setText] = useState("");
  const [status ,setStatus] =useState("idel")
    const dispatch = useDispatch()

  const addNameTodo = (event) => {
    setText(event.target.value);
  };

  const getNameTodo =async (event) => {
    const trimmedtext = text.trim();
    if (event.which === 13 && trimmedtext) {
      setStatus('loading')
     await dispatch(saveNewTodo(trimmedtext));
      setText('')
      setStatus('idel')
    }
  };
  const isLoading ='loading' === status
  const placeholder = isLoading?'':"What needs to be done?"
  const loader = isLoading?<ThreeDots color="#ccc" />:null
  return (
    <header className="header">
      <input
        onChange={addNameTodo}
        onKeyDown={getNameTodo}
        className="new-todo"
        placeholder={placeholder}
        value={text}
        disabled={isLoading}
      />
      {loader}
    </header>
    
  );
}
