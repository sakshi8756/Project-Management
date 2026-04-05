import React from "react";

const Project = () => {
  const projects = [
    { name: "DevSutra", progress: 10, tasks: 24, completed: 2 },
    { name: "FlowSync", progress: 50, tasks: 20, completed: 10 },
    { name: "CodeSutra", progress: 75, tasks: 30, completed: 22 },
    { name: "StackFlow", progress: 100, tasks: 18, completed: 18 },
  ];

  // Progress Color Logic
  const getProgressColor = (progress) => {
    if (progress === 100) return "bg-blue-600"; // completed
    if (progress >= 70) return "bg-green-500"; // almost done
    if (progress >= 30) return "bg-yellow-400"; // mid
    return "bg-red-500"; // low
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
        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition">
          + New Project
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold mb-2">
              {project.name}
            </h2>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                className={`${getProgressColor(project.progress)} h-3 rounded-full transition-all`}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>

            {/* Progress Text */}
            <div className="flex justify-between text-sm mb-2">
              <p>Progress: {project.progress}%</p>
              <p className="font-semibold">
                {getStatusText(project.progress)}
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <p>Total: {project.tasks}</p>
              <p>Done: {project.completed}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600">
                View
              </button>
              <button className="flex-1 bg-gray-200 py-1 rounded-lg hover:bg-gray-300">
                Edit
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Project;