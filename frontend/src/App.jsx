import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Landing from './Pages/Landing';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Dashboard from './Pages/Dashboard';
import ProjectDetail from './Pages/ProjectDetail';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}

export default App;