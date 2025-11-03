import "./App.css";
import useOrientation from "./hooks/useOrientation";

function App() {
  const data = useOrientation();
  return (
    <>
      {data ? (
        <div className="App">
          <h1>Device Orientation</h1>
          <p>Alpha (Yaw): {data.alpha.toFixed(2)}</p>
          <p>Beta (Pitch): {data.beta.toFixed(2)}</p>
          <p>Gamma (Roll): {data.gamma.toFixed(2)}</p>
        </div>
      ) : (
        <div className="App">
          <h1>Device Orientation</h1>
          <p>Loading orientation data...</p>
        </div>
      )}
    </>
  );
}

export default App;
