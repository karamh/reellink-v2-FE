// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/View";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
