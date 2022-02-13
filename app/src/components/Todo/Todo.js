import "./Todo.css";
import { db } from "../../firebase";
import { useMainContext } from "../../hooks/useMainContext";

function Todo({ id, completed, text }) {
  const { user } = useMainContext();

  const toggleCompleted = () => {
    const newTodo = {
      id,
      text,
      completed: !completed,
    };
    db.collection("users")
      .doc(`${user.uid}`)
      .collection("todos")
      .doc(`${id}`)
      .set(newTodo)
      .catch((err) => alert(err.message));
  };

  return (
    <p
      onClick={toggleCompleted}
      className={`todo ${completed ? `completed` : ""}`}
    >
      {text}
    </p>
  );
}

export default Todo;
