import "./App.css";
import useOrientation from "./hooks/useOrientation";

function App() {
  const { orientation, permission, error, requestPermission } = useOrientation();

  return (
    <div className="App">
      <h1>Device Orientation</h1>

      {permission === "prompt" && (
        <div>
          <p>センサーへのアクセス許可が必要です</p>
          <button onClick={requestPermission}>センサーを有効にする</button>
        </div>
      )}

      {permission === "denied" && (
        <div>
          <p>センサーへのアクセスが拒否されました</p>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}

      {permission === "granted" && orientation ? (
        <div>
          <p>Alpha (Yaw): {orientation.alpha.toFixed(2)}</p>
          <p>Beta (Pitch): {orientation.beta.toFixed(2)}</p>
          <p>Gamma (Roll): {orientation.gamma.toFixed(2)}</p>
        </div>
      ) : permission === "granted" ? (
        <p>Loading orientation data...</p>
      ) : null}
    </div>
  );
}

export default App;
