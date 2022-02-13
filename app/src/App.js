import { useMainContext } from "./hooks/useMainContext";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";


function App() {
  const { user } = useMainContext();
  return (
    <div className="app">
      <Header />
      {user ? <Dashboard /> : <Login />}
      <Footer />
    </div>
  );
}

export default App;
