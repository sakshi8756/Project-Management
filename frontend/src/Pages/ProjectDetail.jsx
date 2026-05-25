import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetail.css';

function ProjectDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [team, setTeam] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
  const [newMemberId, setNewMemberId] = useState('');

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  useEffect(() => {

    if (!user) {
      navigate('/signin');
      return;
    }

    fetchProject();
    fetchMembers();
    fetchTasks();
    fetchUsers();

  }, [id]);

  // ========================
  // FETCH PROJECT
  // ========================

  const fetchProject = async () => {

    try {

      const res = await fetch(
        `http://localhost:4000/project/${id}`
      );

      const data = await res.json();

      setProject(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  };

  // ========================
  // FETCH MEMBERS
  // ========================

  const fetchMembers = async () => {

    try {

      const res = await fetch(
        `http://localhost:4000/project-members/${id}`
      );

      const data = await res.json();

      setTeam(data);

    } catch (err) {

      console.error(err);
    }
  };

  // ========================
  // FETCH TASKS
  // ========================

  const fetchTasks = async () => {

    try {

      const res = await fetch(
        `http://localhost:4000/project-tasks/${id}`
      );

      const data = await res.json();

      setTasks(data);

    } catch (err) {

      console.error(err);
    }
  };

  // ========================
  // FETCH USERS
  // ========================

  const fetchUsers = async () => {

    try {

      const res = await fetch(
        'http://localhost:4000/users'
      );

      const data = await res.json();

      setAllUsers(
        data.filter(u => u.id !== user.id)
      );

    } catch (err) {

      console.error(err);
    }
  };

  // ========================
  // TOGGLE TASK
  // ========================

  const handleToggleTask = (taskId) => {

    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    );
  };

  // ========================
  // DELETE PROJECT
  // ========================

  const handleDeleteProject = async () => {

    const confirmDelete = window.confirm(
      'Delete this project permanently?'
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `http://localhost:4000/delete-project/${id}`,
        {
          method: 'DELETE'
        }
      );

      const data = await res.json();

      alert(data.message);

      navigate('/dashboard');

    } catch (err) {

      console.error(err);

      alert('Delete failed');
    }
  };

  // ========================
  // ADD MEMBER
  // ========================

  const handleAddMember = async () => {

    if (!newMemberId) return;

    try {

      const res = await fetch(
        'http://localhost:4000/add-member',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: newMemberId,
            project_id: id,
            role: 'member'
          })
        }
      );

      const data = await res.json();

      alert(data.message);

      fetchMembers();

      setIsAddMemberOpen(false);

      setNewMemberId('');

    } catch (err) {

      console.error(err);
    }
  };

  // ========================
  // REMOVE MEMBER
  // ========================

  const handleRemoveMember = async (memberId) => {

    const confirmRemove = window.confirm(
      'Remove member from project?'
    );

    if (!confirmRemove) return;

    try {

      const res = await fetch(
        `http://localhost:4000/remove-member/${id}/${memberId}/${user.id}`,
        {
          method: 'DELETE'
        }
      );

      const data = await res.json();

      alert(data.message);

      fetchMembers();

    } catch (err) {

      console.error(err);
    }
  };

  // ========================
  // LOADING
  // ========================

  if (loading) {

    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  // ========================
  // MAIN UI
  // ========================

  return (

    <div className="project-page">

      {/* SIDEBAR */}

      <aside className="project-sidebar">

        <h1 className="sidebar-logo">
          Planify
        </h1>

        <button
          onClick={() => navigate('/dashboard')}
          className="sidebar-btn"
        >
          Dashboard
        </button>

      </aside>

      {/* MAIN */}

      <main className="project-main">

        {/* TOP */}

        <div className="project-header">

          <div>

            <h1 className="project-title">
              {project.project_name}
            </h1>

            <p className="project-description">
              {project.description}
            </p>

          </div>

          <button
            className="delete-project-btn"
            onClick={handleDeleteProject}
          >
            Delete Project
          </button>

        </div>

        {/* GRID */}

        <div className="project-grid">

          {/* TEAM */}

          <div className="glass-card">

            <div className="section-header">

              <h2>Team Members</h2>

              <button
                className="add-member-btn"
                onClick={() =>
                  setIsAddMemberOpen(true)
                }
              >
                + Add
              </button>

            </div>

            <div className="members-list">

              {team.map(member => (

                <div
                  key={member.id}
                  className="member-card"
                >

                  <div className="member-avatar">
                    {member.name?.charAt(0)}
                  </div>

                  <div className="member-info">

                    <h4>{member.name}</h4>

                    <span>{member.role}</span>

                  </div>

                  {member.role !== 'admin' && (

                    <button
                      className="remove-member-btn"
                      onClick={() =>
                        handleRemoveMember(member.id)
                      }
                    >
                      Remove
                    </button>
                  )}

                </div>
              ))}

            </div>

          </div>

          {/* TASKS */}

          <div className="glass-card">

            <div className="section-header">

              <h2>Tasks</h2>

            </div>

            <div className="tasks-list">

              {tasks.map(task => (

                <div
                  key={task.id}
                  className="task-card"
                >

                  <div
                    className={
                      task.completed
                        ? 'task-check active'
                        : 'task-check'
                    }
                    onClick={() =>
                      handleToggleTask(task.id)
                    }
                  >
                    ✓
                  </div>

                  <div className="task-content">

                    <h4>{task.title}</h4>

                    <p>
                      Assigned to:
                      {' '}
                      {task.assigned_name}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </main>

      {/* ADD MEMBER MODAL */}

      {isAddMemberOpen && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h2>Add Member</h2>

            <select
              value={newMemberId}
              onChange={(e) =>
                setNewMemberId(e.target.value)
              }
            >

              <option value="">
                Select User
              </option>

              {allUsers.map(u => (

                <option
                  key={u.id}
                  value={u.id}
                >
                  {u.name}
                </option>
              ))}

            </select>

            <div className="modal-actions">

              <button
                onClick={() =>
                  setIsAddMemberOpen(false)
                }
              >
                Cancel
              </button>

              <button
                onClick={handleAddMember}
              >
                Add
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ProjectDetail;