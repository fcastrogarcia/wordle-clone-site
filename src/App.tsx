import "./App.css";
import Grid from "./components/Grid";
import useHandleKeys from "./hooks/useHandleKeys";

function App() {
  useHandleKeys();

  return (
    <div className="layout">
      <Grid />
    </div>
  );
}

export default App;
