import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  // const [name, setName] = useState('');
  // const [profession, setprofession] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:4000/details')
      const data = await res.json();
      setData(data);
      // setName(data.name);
      // setprofession(data.profession);
      console.log(data);
    }
    catch (err) {
      console.error('Error fetching data:', err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="font-sans bg-slate-50">

      {/* HERO SECTION */}
      <section className="text-center py-20 px-5">
        <h1 className="text-4xl mb-2.5">
          Smart Developer Workflow Management 🚀
        </h1>
        <p className="text-gray-600 mb-5">
          Manage tasks, dependencies and teams efficiently in one platform.
        </p>
        <div className="flex justify-center gap-2.5">
          <Link to="/Dashboard" className="bg-blue-600 text-white py-3 px-5 rounded-lg cursor-pointer">Go to Dashboard</Link>
          <button className="bg-gray-200 py-3 px-5 rounded-lg cursor-pointer">View Projects</button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="text-center py-12.5 px-5">
        <h2>Core Features</h2>

        <div className="flex justify-center gap-5 mt-5 flex-wrap">
          <div className="bg-white p-5 w-64 rounded-xl shadow-md">
            <h3>🔗 Dependency System</h3>
            <p>Auto manage task flow (Backend → Frontend → UI).</p>
          </div>

          <div className="bg-white p-5 w-64 rounded-xl shadow-md">
            <h3>⚡ Parallel Workflow</h3>
            <p>Work simultaneously using mock APIs.</p>
          </div>

          <div className="bg-white p-5 w-64 rounded-xl shadow-md">
            <h3>📊 Project Insights</h3>
            <p>Track progress, delays and productivity.</p>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="p-12.5 text-center">
        <h2>Hi {data?.name} 👋</h2>
        <h2>{data?.profession}</h2>
        <p>Your project overview</p>

        <div className="bg-blue-600 text-white p-5 rounded-xl w-75 mx-auto mt-5">
          <p><b>Project:</b> DevSutra</p>
          <p>Status: In Progress</p>
          <p>Completion: 65%</p>
          <button className="mt-2.5 py-2 px-3.75 bg-white text-blue-600 rounded-md cursor-pointer">View Details</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white p-10 text-center">
        <h2>DevSutra</h2>
        <p>Building smarter workflows for developers.</p>
      </footer>

    </div>
  );
};

export default Home;