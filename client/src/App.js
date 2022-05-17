import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Router>
      <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
