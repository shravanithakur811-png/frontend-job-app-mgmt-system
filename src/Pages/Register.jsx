import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/register", data);
      alert("Registered successfully");
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Register</h3>

      <input
        className="form-control my-2"
        placeholder="Name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input
        className="form-control my-2"
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <input
        type="password"
        className="form-control my-2"
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <select
        className="form-control my-2"
        onChange={(e) => setData({ ...data, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button className="btn btn-success" onClick={handleRegister}>
        Register
      </button>
      <p>
  Already have an account? <Link to="/">Login</Link>
</p>
    </div>
  );
}

export default Register;