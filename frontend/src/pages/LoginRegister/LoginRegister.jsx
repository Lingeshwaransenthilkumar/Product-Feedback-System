import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./LoginRegister.css";

const LoginRegister = () => {
  const [tab, setTab] = useState("login"); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      tab === "register"
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

    const body =
      tab === "register"
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { name: formData.name, password: formData.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage(`✅ ${tab === "register" ? "Registered" : "Logged in"} successfully!`);
      console.log("Response:", data);

      // Save token in localStorage if login
      if (tab === "login" && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName",data.name);
      }

      // Redirect to home after short delay (so user sees message)
      setTimeout(() => {
        if (data.role === "admin") {
            navigate("/admin");   // AdminDashboard.jsx
          } else {
            navigate("/home");    // Home.jsx (user feedback board)
          } 
      }, 500);
      
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="login-register-container">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={tab === "login" ? "active" : ""}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={tab === "register" ? "active" : ""}
          onClick={() => setTab("register")}
        >
          Register
        </button>
      </div>

      {/* Form */}
      <form className="form-container" onSubmit={handleSubmit}>
        {tab === "register" && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </>
        )}

        {tab === "login" && (
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Your Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {tab === "register" ? "Create Account" : "Login"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoginRegister;
