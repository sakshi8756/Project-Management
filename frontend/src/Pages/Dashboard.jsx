import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    fetchUsers();
    fetchProjects();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:4000/users');
      const data = await res.json();
      setAllUsers(data.filter(u => u.id !== user.id));
    } catch (err) {
      console.error('Error fetching users');
    }
  };

 const fetchProjects = async () => {
  try {
    const res = await fetch(`http://localhost:4000/user-projects/${user.id}`);

    if (!res.ok) {
      console.error('Server Error');
      setProjects([]);
      return;
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      setProjects(data);
    } else {
      console.error('Invalid project data:', data);
      setProjects([]);
    }

  } catch (err) {
    console.error('Error fetching projects:', err);
    setProjects([]);
  }
};

  const toggleMember = (memberId) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:4000/create-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectName,
          description: projectDesc,
          userId: user.id,
          members: selectedMembers
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Project created successfully!');
        setMessageType('success');
        setProjectName('');
        setProjectDesc('');
        setSelectedMembers([]);
        fetchProjects();
      } else {
        setMessage(data.message || 'Failed to create project');
        setMessageType('error');
      }
    } catch (err) {
      setMessage('Server not reachable');
      setMessageType('error');
    }

    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!user) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-inner">
        <div className="dashboard-header">
          <h1>Welcome, {user.name} 👋</h1>
          <p>Manage your projects and collaborate with your team.</p>
        </div>

        {/* Create Project */}
        <div className="create-project-section">
          <h2>➕ Create New Project</h2>
          <div className="create-project-card">
            <form className="create-form" onSubmit={handleCreateProject}>
              <div className="form-group">
                <label htmlFor="project-name">Project Title</label>
                <input
                  id="project-name"
                  type="text"
                  placeholder="My awesome project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="project-desc">Description</label>
                <textarea
                  id="project-desc"
                  placeholder="Describe your project..."
                  rows={3}
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                />
              </div>

              <div className="members-selection">
                <label>Add Members</label>
                <div className="members-list">
                  {allUsers.length === 0 && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      No other users yet. Invite people to sign up!
                    </span>
                  )}
                  {allUsers.map(u => (
                    <div
                      key={u.id}
                      className={`member-chip ${selectedMembers.includes(u.id) ? 'selected' : ''}`}
                      onClick={() => toggleMember(u.id)}
                    >
                      <div className="chip-avatar">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      {u.name}
                    </div>
                  ))}
                </div>
              </div>

              {message && (
                <div className={`create-message ${messageType}`}>
                  {message}
                </div>
              )}

              <div className="create-form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Projects List */}
        <div className="projects-section">
          <h2>
            📂 Your Projects
            <span className="project-count">
  {Array.isArray(projects) ? projects.length : 0}
</span>
          </h2>

          {!Array.isArray(projects) || projects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No projects yet</h3>
              <p>Create your first project above to get started!</p>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="project-card"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <div className="project-card-header">
                    <h3>{project.project_name}</h3>
                    <span className={`project-role-badge ${project.role}`}>
                      {project.role}
                    </span>
                  </div>
                  <p>{project.description || 'No description'}</p>
                  <div className="project-card-footer">
                    <span className="project-date">
                      {formatDate(project.created_at)}
                    </span>
                    <span className="project-arrow">→</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
