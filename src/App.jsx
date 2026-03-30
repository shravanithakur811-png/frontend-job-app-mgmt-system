import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AdminDashboard from "./Pages/AdminDashboard";
import Jobs from "./Pages/Jobs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const role = localStorage.getItem("role");

  return (
    <div>
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Page */}
        <Route
          path="/jobs"
          element={
            role === "user" ? <Jobs /> : <Navigate to="/" />
          }
        />

        {/* Admin Page */}
        <Route
          path="/admin"
          element={
            role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;