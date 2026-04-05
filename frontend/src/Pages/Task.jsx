import React from "react";
import { Link } from "react-router-dom";

const Tasks = () => {
  const tasks = [
    {
      name: "Build API",
      user: "Vansh",
      role: "Backend",
      status: "In Progress",
      priority: "High",
    },
    {
      name: "Design UI",
      user: "Sakshi",
      role: "Frontend",
      status: "Pending",
      priority: "Medium",
    },
    {
      name: "Database Schema",
      user: "Riya",
      role: "DB",
      status: "Blocked",
      priority: "High",
    },
    {
      name: "Integrate API",
      user: "Aman",
      role: "Frontend",
      status: "Completed",
      priority: "Low",
    },
  ];

  const columns = ["Pending", "In Progress", "Blocked", "Completed"];

  const getPriorityColor = (priority) => {
    if (priority === "High") return "bg-red-500";
    if (priority === "Medium") return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📋 Task Management</h1>
        <Link to='/CreateTask' className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">
          + Create Task
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total Tasks</p>
          <h2 className="font-bold text-xl">{tasks.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-yellow-500">
          <p>Pending</p>
          <h2 className="font-bold text-xl">
            {tasks.filter(t => t.status === "Pending").length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-red-500">
          <p>Blocked</p>
          <h2 className="font-bold text-xl">
            {tasks.filter(t => t.status === "Blocked").length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-green-500">
          <p>Completed</p>
          <h2 className="font-bold text-xl">
            {tasks.filter(t => t.status === "Completed").length}
          </h2>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="grid md:grid-cols-4 gap-4">

        {columns.map((col, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-xl">

            <h2 className="font-semibold mb-4">{col}</h2>

            {tasks
              .filter(task => task.status === col)
              .map((task, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg shadow mb-3 hover:shadow-md transition"
                >
                  <h3 className="font-semibold">{task.name}</h3>

                  <p className="text-sm text-gray-500">
                    {task.user} • {task.role}
                  </p>

                  {/* Priority */}
                  <div
                    className={`w-3 h-3 rounded-full mt-2 ${getPriorityColor(
                      task.priority
                    )}`}
                  ></div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                      Start
                    </button>
                    <button className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                      Done
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}

      </div>
    </div>
  );
};

export default Tasks;