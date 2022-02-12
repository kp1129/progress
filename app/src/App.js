import { useMainContext } from './hooks/useMainContext';
import './App.css';

function App() {
  const { user, todos } = useMainContext();
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
