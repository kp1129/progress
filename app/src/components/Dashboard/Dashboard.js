import "./Dashboard.css";
import AddNewTodo from "../AddNewTodo/AddNewTodo";
import Todo from "../Todo/Todo";
import { useEffect } from "react";
import { useMainContext } from "../../hooks/useMainContext";
import { db } from "../../firebase";

function Dashboard() {
  const { user, todos, setTodos } = useMainContext();

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .collection("todos")
      .onSnapshot((snapshot) => {
        const newTodos = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data };
        });
        setTodos(newTodos);
      });
  }, []);
  return (
    <main className="dashboard">
      <AddNewTodo />

      {todos.length > 0 ? (<div className="display-todos">
        {todos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              completed={todo.completed}
              text={todo.text}
            />
          ))
        }
      </div>) : (
          <div className="display-instructions">
            <p>You don't have any tasks to do yet!</p>
            <p>- add new tasks using the form above </p>
            <p>- click on them to mark them as done</p>
          </div>
      )}
    </main>
  );
}

export default Dashboard;
