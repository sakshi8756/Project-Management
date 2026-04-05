import React from "react";

const Setting = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* PROFILE SETTINGS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">👤 Profile</h2>

          <input
            type="text"
            placeholder="Name"
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </div>

        {/* PASSWORD */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">🔐 Security</h2>

          <input
            type="password"
            placeholder="New Password"
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-3 p-2 border rounded"
          />

          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Update Password
          </button>
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">🔔 Notifications</h2>

          <div className="flex justify-between mb-2">
            <p>Email Alerts</p>
            <input type="checkbox" />
          </div>

          <div className="flex justify-between mb-2">
            <p>Task Updates</p>
            <input type="checkbox" />
          </div>

          <div className="flex justify-between">
            <p>Deadline Alerts</p>
            <input type="checkbox" />
          </div>
        </div>

        {/* THEME SETTINGS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">🎨 Appearance</h2>

          <div className="flex justify-between mb-3">
            <p>Dark Mode</p>
            <input type="checkbox" />
          </div>

          <button className="bg-gray-800 text-white px-4 py-2 rounded">
            Apply Theme
          </button>
        </div>

      </div>
    </div>
  );
};

export default Setting;