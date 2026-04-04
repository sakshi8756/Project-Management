import React, { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    console.log("Signup Data:", form);
    // 👉 yaha backend connect kar sakti ho
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-9 rounded-lg shadow-lg w-80 flex flex-col" onSubmit={handleSubmit}>
        <h2 className="text-center mb-1">Create Account 🚀</h2>
        <p className="text-center mb-5 text-gray-600 text-sm">Sign up to get started</p>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          className="p-3 mb-4 rounded-md border border-gray-300 outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="p-3 mb-4 rounded-md border border-gray-300 outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="p-3 mb-4 rounded-md border border-gray-300 outline-none"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="p-3 mb-4 rounded-md border border-gray-300 outline-none"
          required
        />

        <button type="submit" className="p-3 bg-blue-500 text-white border-none rounded-md cursor-pointer font-bold">
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer font-bold">Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;