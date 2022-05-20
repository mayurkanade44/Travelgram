import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddEdit, Dahsboard, Home, Login, SingleBlog } from "./pages";
import { Navbar, ProtectedRoute } from "./components";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/addTravel"
            element={
              <ProtectedRoute>
                <AddEdit />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<Dahsboard />} />
          <Route path="/editTravel/:id" element={<AddEdit />} />
          <Route path="/travelBlog/:id" element={<SingleBlog />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
