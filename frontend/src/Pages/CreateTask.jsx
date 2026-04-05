import React, { useState } from "react";

const NewProject = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    deadline: "",
    manager: "",
    priority: "Medium",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Data:", form);

    // later: send to backend
    alert("Project Created ✅");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          🚀 Create New Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Project Name */}
          <div>
            <label className="block mb-1 font-medium">Project Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter project name"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter project details"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Manager */}
          <div>
            <label className="block mb-1 font-medium">Project Manager</label>
            <input
              type="text"
              name="manager"
              value={form.manager}
              onChange={handleChange}
              placeholder="Enter manager name"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block mb-1 font-medium">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Project
          </button>

        </form>
      </div>
    </div>
  );
};

export default NewProject;