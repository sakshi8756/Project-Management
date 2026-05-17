import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Project = () => {
  const [projects, setProjects] = useState([]);

  // FETCH PROJECTS FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:4000/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  // DELETE PROJECT
  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/delete-project/${id}`, {
      method: "DELETE",
    });

    // update UI instantly
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Progress Color Logic
  const getProgressColor = (progress) => {
    if (progress === 100) return "bg-blue-600";
    if (progress >= 70) return "bg-green-500";
    if (progress >= 30) return "bg-yellow-400";
    return "bg-red-500";
  };

  const getStatusText = (progress) => {
    if (progress === 100) return "Completed";
    if (progress >= 70) return "Almost Done";
    if (progress >= 30) return "In Progress";
    return "At Risk";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🚀 Projects</h1>

        <Link
          to="/NewProject"
          className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700"
        >
          + New Project
        </Link>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
          >

            {/* Title */}
            <h2 className="text-xl font-semibold mb-2">
              {project.project_name}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-2">
              {project.description}
            </p>

            {/* Fake Progress (later dynamic from tasks) */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                className={`${getProgressColor(50)} h-3 rounded-full`}
                style={{ width: `50%` }}
              ></div>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <p>Progress: 50%</p>
              <p className="font-semibold">
                {getStatusText(50)}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">

              <button className="flex-1 bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600">
                View
              </button>

              <button className="flex-1 bg-gray-200 py-1 rounded-lg hover:bg-gray-300">
                Edit
              </button>

              <button
                onClick={() => handleDelete(project.id)}
                className="flex-1 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Project;