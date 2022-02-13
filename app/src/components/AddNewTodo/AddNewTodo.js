import "./AddNewTodo.css";
import { db } from "../../firebase";
import { useMainContext } from "../../hooks/useMainContext";
import { useState } from "react";

function AddForm() {
  const { user } = useMainContext();
  const [newTodoText, setNewTodoText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    const trimmedText = newTodoText?.trim();
    if (!trimmedText) {
      alert("Please add text before submitting your todo");
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
    };
    db.collection("users")
      .doc(user.uid)
      .collection("todos")
      .doc(`${newTodo.id}`)
      .set(newTodo)
      .then(() => setNewTodoText(""))
      .catch((err) => alert(err.message));
  };
  return (
    <form className="new-todo" onSubmit={addTodo}>
      <label htmlFor="new-todo">New task </label>
      <input
        name="new-todo"
        id="new-todo"
        type="text"
        placeholder="Buy groceries"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
      />
      <button type="submit">add new task to do</button>
    </form>
  );
}

export default AddForm;
