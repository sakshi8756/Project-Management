import React from "react";

const Dashboard = () => {
  const stats = [
    { title: "Total Tasks", value: 24 },
    { title: "Completed", value: 16 },
    { title: "Pending", value: 8 },
    { title: "Blocked", value: 3 },
  ];

  const tasks = [
    { name: "Build API", status: "In Progress", dependency: "None" },
    { name: "Frontend UI", status: "Blocked", dependency: "Backend" },
    { name: "Database Schema", status: "Pending", dependency: "Backend" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-blue-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">DevSutra</h2>

        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-300">Dashboard</li>
          <li className="cursor-pointer hover:text-gray-300">Projects</li>
          <li className="cursor-pointer hover:text-gray-300">Tasks</li>
          <li className="cursor-pointer hover:text-gray-300">Team</li>
          <li className="cursor-pointer hover:text-gray-300">Settings</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Hi Sakshi 👋</p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-gray-500">{item.title}</h3>
              <p className="text-xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* PROJECT HEALTH */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Project Health</h2>
          <p className="text-yellow-500 font-bold">⚠️ At Risk</p>
        </div>

        {/* TASK TABLE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">My Tasks</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-2">Task</th>
                <th>Status</th>
                <th>Dependency</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{task.name}</td>
                  <td>{task.status}</td>
                  <td>{task.dependency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
