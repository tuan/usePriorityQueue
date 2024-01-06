import { useState } from "react";
import "./App.css";
import Test from "./components/Test";

function App() {
  const [logs, setLogs] = useState<readonly string[]>([]);

  function log(message: string) {
    setLogs((previousLogs) => [...previousLogs, message]);
  }
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <Test key={i} name={`test ${i}`} priority={i} onLog={log}></Test>
      ))}

      {logs.map((log, index) => {
        return <p key={index}> {log}</p>;
      })}
    </>
  );
}

export default App;
