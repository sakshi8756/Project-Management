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
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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

      const res = await fetch(
        `http://localhost:4000/user-projects/${user.id}`
      );

      if (!res.ok) {

        setProjects([]);
        return;
      }

      const data = await res.json();

      setProjects(Array.isArray(data) ? data : []);

    } catch (err) {

      console.error(err);

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

    try {

      const res = await fetch(
        'http://localhost:4000/create-project',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: projectName,
            description: projectDesc,
            userId: user.id,
            members: selectedMembers
          })
        }
      );

      const data = await res.json();

      if (res.ok) {

        setMessage('Project created successfully!');
        setMessageType('success');

        setProjectName('');
        setProjectDesc('');
        setSelectedMembers([]);

        fetchProjects();

        setTimeout(() => {

          setIsCreateOpen(false);
          setMessage('');

        }, 1000);

      } else {

        setMessage(data.message);
        setMessageType('error');
      }

    } catch (err) {

      setMessage('Server Error');
      setMessageType('error');
    }

    setLoading(false);
  };

  const formatDate = (dateStr) => {

    return new Date(dateStr).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    );
  };

  if (!user) return null;

  const filteredProjects = projects.filter(project => {

    const nameMatch =
      project.project_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const descMatch =
      project.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    return nameMatch || descMatch;
  });

  return (

    <div className="dashboard-page">

      {/* SIDEBAR */}

      <aside className="dashboard-sidebar">

        <div className="sidebar-top">

          <h1 className="sidebar-logo">Planify</h1>

          <p className="sidebar-subtitle">
            Premium Workspace
          </p>

        </div>

        <nav className="sidebar-nav">

          <button
            className="sidebar-link active"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
            }
          >
            Dashboard
          </button>

          <button
            className="sidebar-link"
            onClick={() =>
              document
                .getElementById('projects')
                ?.scrollIntoView({
                  behavior: 'smooth'
                })
            }
          >
            Projects
          </button>

          <button
            className="sidebar-link"
            onClick={() =>
              document
                .getElementById('tasks')
                ?.scrollIntoView({
                  behavior: 'smooth'
                })
            }
          >
            Tasks
          </button>

          <button
            className="sidebar-link"
            onClick={() =>
              document
                .getElementById('team')
                ?.scrollIntoView({
                  behavior: 'smooth'
                })
            }
          >
            Team
          </button>

        </nav>

        <button
          className="create-project-btn"
          onClick={() => setIsCreateOpen(true)}
        >
          + Create Project
        </button>

      </aside>

      {/* MAIN CONTENT */}

      <main className="dashboard-main">

        {/* TOPBAR */}

        <div className="dashboard-topbar">

          <input
            type="text"
            placeholder="Search projects..."
            className="search-input"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
          />

          <div className="topbar-user">

            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <span>{user.name}</span>

          </div>

        </div>

        {/* WELCOME */}

        <section className="welcome-section">

          <div>

            <h2>
              Welcome back, {user.name} 👋
            </h2>

            <p>
              You have {projects.length} active projects.
            </p>

          </div>

          <button
            className="new-project-btn"
            onClick={() => setIsCreateOpen(true)}
          >
            New Project
          </button>

        </section>

        {/* STATS */}

        <section className="stats-grid">

          <div className="stat-card">

            <h3>Total Projects</h3>

            <span>{projects.length}</span>

          </div>

          <div className="stat-card">

            <h3>Completed Tasks</h3>

            <span>148</span>

          </div>

          <div className="stat-card">

            <h3>Team Members</h3>

            <span>{allUsers.length + 1}</span>

          </div>

          <div className="stat-card">

            <h3>Productivity</h3>

            <span>92%</span>

          </div>

        </section>

        {/* PROJECTS */}

        <section className="projects-section">

          <div className="projects-header">

            <h3>Current Projects</h3>

            <span>
              {filteredProjects.length} Projects
            </span>

          </div>

          {filteredProjects.length === 0 ? (

            <div className="empty-projects">

              <h3>No Projects Found</h3>

              <p>
                Create your first project to get started.
              </p>

            </div>

          ) : (

            <div className="projects-grid">

              {filteredProjects.map((project, index) => {

                const progressVal =
                  Math.min(
                    100,
                    Math.max(
                      10,
                      (
                        (
                          project.id
                            ? String(project.id).charCodeAt(0)
                            : 5
                        ) * 10
                      )
                    )
                  );

                const isEven = index % 2 === 0;

                const accentStyles = isEven
                  ? {
                    bg: 'cyan-bg',
                    text: 'cyan-text',
                    border: 'cyan-border',
                    gradient: 'cyan-gradient'
                  }
                  : {
                    bg: 'purple-bg',
                    text: 'purple-text',
                    border: 'purple-border',
                    gradient: 'purple-gradient'
                  };

                return (

                  <div
                    key={project.id}
                    className={`project-card ${accentStyles.border}`}
                    onClick={() =>
                      navigate(`/project/${project.id}`)
                    }
                  >

                    <div className="project-top">

                      <div className={`project-icon ${accentStyles.bg}`}>
                        📁
                      </div>

                      <span
                        className={`project-role ${accentStyles.bg} ${accentStyles.text}`}
                      >
                        {project.role}
                      </span>

                    </div>

                    <div>

                      <h3 className="project-title">
                        {project.project_name}
                      </h3>

                      <p className="project-desc">
                        {project.description}
                      </p>

                    </div>

                    <div className="project-progress">

                      <div className="progress-top">

                        <span>Progress</span>

                        <span className={accentStyles.text}>
                          {progressVal}%
                        </span>

                      </div>

                      <div className="progress-bar">

                        <div
                          className={`progress-fill ${accentStyles.gradient}`}
                          style={{
                            width: `${progressVal}%`
                          }}
                        ></div>

                      </div>

                    </div>

                    <div className="project-footer">

                      <div className="member-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      <span className="project-date">
                        {formatDate(project.created_at)}
                      </span>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </section>

      </main>

      {/* CREATE PROJECT MODAL */}

      {isCreateOpen && (

        <div className="modal-overlay">

          <div className="create-modal">

            <div className="modal-header">

              <h2>Create Project</h2>

              <button
                onClick={() => {
                  setIsCreateOpen(false);
                  setMessage('');
                }}
              >
                ✕
              </button>

            </div>

            <form
              className="create-form"
              onSubmit={handleCreateProject}
            >

              <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) =>
                  setProjectName(e.target.value)
                }
                required
              />

              <textarea
                rows="4"
                placeholder="Project Description"
                value={projectDesc}
                onChange={(e) =>
                  setProjectDesc(e.target.value)
                }
              />

              <div className="members-select">

                {allUsers.map(u => (

                  <button
                    type="button"
                    key={u.id}
                    className={
                      selectedMembers.includes(u.id)
                        ? 'member-chip selected'
                        : 'member-chip'
                    }
                    onClick={() =>
                      toggleMember(u.id)
                    }
                  >
                    {u.name}
                  </button>
                ))}

              </div>

              {message && (

                <div
                  className={
                    messageType === 'success'
                      ? 'success-msg'
                      : 'error-msg'
                  }
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {
                  loading
                    ? 'Creating...'
                    : 'Create Project'
                }
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;