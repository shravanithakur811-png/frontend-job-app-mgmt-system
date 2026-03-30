import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // ✅ navigation hook

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        data
      );

      // save auth
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ✅ Redirect based on role
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/jobs");
      }

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input
        className="form-control mb-2"
        placeholder="Email"
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>

      <p className="mt-3">
        Don't have account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;