import { createContext, useState } from "react";

export const MainContext = createContext();

// wrap main slices of state in custom context provider component
export function MainContextProvider(props) {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  const value = { todos, setTodos, user, setUser };

  return <MainContext.Provider value={value} {...props} />;
}
