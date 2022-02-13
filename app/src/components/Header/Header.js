import "./Header.css";
import { useMainContext } from "../../hooks/useMainContext";

function Header() {
  const { user, setUser, setTodos } = useMainContext();

  const logout = () => {
    setTodos([]);
    setUser(null);
  };

  return (
    <header>
      <span>P |</span>
      {user && (
        <div>
          <p>Hello, {user.firstName}</p>
          <button onClick={logout}>LOGOUT</button>
        </div>
      )}
    </header>
  );
}

export default Header;
