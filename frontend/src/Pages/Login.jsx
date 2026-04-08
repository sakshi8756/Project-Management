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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      alert(data.message);
      console.log(data);
      setForm({
        email: "",
        password: ""
      });}
       catch (error) {
      alert(error.message || "Login failed ❌");
      console.error(error);}};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-9 rounded-2xl shadow-[0_20px_25px_rgba(0,0,0,0.2)] w-[320px] flex flex-col"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center mb-1 text-2xl font-semibold">Welcome Back 👋</h2>
        <p className="text-center mb-5 text-sm text-gray-500">Login to your account</p>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="px-3 py-3 mb-4 rounded-xl border border-gray-300 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="px-3 py-3 mb-4 rounded-xl border border-gray-300 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          required
        />

        <button
          type="submit"
          className="px-3 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span className="text-indigo-600 font-bold cursor-pointer">Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;