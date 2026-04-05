import React, { useState } from "react";

const AddMember = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Frontend",
    skills: "",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Member Data:", form);

    alert("Member Added Successfully ✅");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          👥 Add Team Member
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter member name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option>Frontend</option>
              <option>Backend</option>
              <option>UI/UX</option>
              <option>Database</option>
              <option>Manager</option>
            </select>
          </div>

          {/* SKILLS */}
          <div>
            <label className="block mb-1 font-medium">Skills</label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. React, Node, Figma"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Member
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddMember;