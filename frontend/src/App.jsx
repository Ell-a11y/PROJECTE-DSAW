import { BrowserRouter, Routes, Route } from "react-router-dom";
import App1 from "./App1";
import App2 from "./App2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App1 />} />
        <Route path="/app2" element={<App2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
