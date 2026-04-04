import React from "react";

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome to Home Page 🏠</h1>
        <p style={styles.text}>
          You have successfully logged in. This is your dashboard.
        </p>

        <div style={styles.buttonGroup}>
          <button style={styles.button}>Profile</button>
          <button style={styles.button}>Settings</button>
          <button style={styles.logout}>Logout</button>
        </div>
      </div>
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
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "350px"
  },
  heading: {
    marginBottom: "10px"
  },
  text: {
    color: "#555",
    marginBottom: "25px"
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px"
  },
  button: {
    flex: 1,
    padding: "10px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  logout: {
    flex: 1,
    padding: "10px",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Home;