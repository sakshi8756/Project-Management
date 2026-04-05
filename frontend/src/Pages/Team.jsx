import React from "react";

const Team = () => {
  const members = [
    {
      name: "Sakshi",
      role: "Frontend",
      tasks: 6,
      completed: 4,
    },
    {
      name: "Vansh",
      role: "Backend",
      tasks: 8,
      completed: 5,
    },
    {
      name: "Riya",
      role: "UI/UX",
      tasks: 2,
      completed: 1,
    },
  ];

  // 🔥 Status Logic
  const getStatus = (tasks) => {
    if (tasks === 0) return { text: "Idle", color: "text-red-500" };
    if (tasks > 6) return { text: "Overloaded", color: "text-yellow-500" };
    return { text: "Active", color: "text-green-500" };
  };

  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.tasks > 0).length;
  const idleMembers = members.filter((m) => m.tasks === 0).length;
  const overloadedMembers = members.filter((m) => m.tasks > 6).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">👥 Team Management</h1>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">
          + Add Member
        </button>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total</p>
          <h2 className="text-xl font-bold">{totalMembers}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Active</p>
          <h2 className="text-green-500 font-bold">{activeMembers}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Idle</p>
          <h2 className="text-red-500 font-bold">{idleMembers}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Overloaded</p>
          <h2 className="text-yellow-500 font-bold">{overloadedMembers}</h2>
        </div>
      </div>

      {/* TEAM GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {members.map((member, index) => {
          const status = getStatus(member.tasks);
          const efficiency = Math.round(
            (member.completed / member.tasks) * 100
          ) || 0;

          return (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold mb-3">
                {member.name.charAt(0)}
              </div>

              {/* Name & Role */}
              <h2 className="text-lg font-semibold">{member.name}</h2>
              <p className="text-gray-500 text-sm mb-2">{member.role} Developer</p>

              {/* Tasks Info */}
              <div className="text-sm mb-2">
                <p>Tasks: {member.tasks}</p>
                <p>Completed: {member.completed}</p>
              </div>

              {/* Efficiency */}
              <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${efficiency}%` }}
                ></div>
              </div>

              <p className="text-xs mb-2">Efficiency: {efficiency}%</p>

              {/* Status */}
              <p className={`font-semibold ${status.color}`}>
                {status.text}
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                <button className="flex-1 bg-blue-500 text-white py-1 rounded-lg">
                  View
                </button>
                <button className="flex-1 bg-gray-200 py-1 rounded-lg">
                  Assign
                </button>
              </div>
            </div>
          );
        })}

      </div>

      {/* INSIGHTS SECTION */}
      <div className="bg-white p-5 rounded-xl shadow mt-6">
        <h2 className="text-lg font-semibold mb-2">⚡ Smart Insights</h2>

        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Backend team is slightly overloaded</li>
          <li>• UI team has low workload</li>
          <li>• Some tasks are blocked due to dependency</li>
        </ul>
      </div>

    </div>
  );
};

export default Team;