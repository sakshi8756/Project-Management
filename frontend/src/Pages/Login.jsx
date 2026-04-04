import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", form);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Welcome Back 👋</h2>
        <p style={styles.subText}>Login to your account</p>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={styles.footer}>
          Don’t have an account? <span style={styles.link}>Sign up</span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5"
  },
  form: {
    background: "#fff",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 20px 25px rgba(0,0,0,0.2)",
    width: "320px",
    display: "flex",
    flexDirection: "column"
  },
  heading: {
    textAlign: "center",
    marginBottom: "5px"
  },
  subText: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#666",
    fontSize: "14px"
  },
  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none"
  },
  button: {
    padding: "12px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  footer: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px"
  },
  link: {
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Login;