import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import Process from "./components/Process.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/process" element={<Process />} />
      </Routes>
    </>
  );
}

export default App;
