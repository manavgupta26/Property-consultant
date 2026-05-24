import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/admin/dashboard");
    }  catch (error) {
  console.log(error.response);

  alert(
    error?.response?.data?.message ||
    "Login Failed"
  );
}
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: 400,
          background: "#fff",
          padding: 40,
          borderRadius: 24,
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: 32,
            marginBottom: 10,
          }}
        >
          Admin Login
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: 28,
          }}
        >
          Login to manage properties
        </p>

        <input
          type="email"
          placeholder="Email"
          style={inputStyle}
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
        type="button"
          style={buttonStyle}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  marginBottom: 16,
  borderRadius: 12,
  border: "1px solid #ddd",
  fontSize: 15,
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: 12,
  background: "#111827",
  color: "#fff",
  fontSize: 16,
  cursor: "pointer",
};