import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showAddMember, setShowAddMember] = useState(false);

  // Task input states per member
  const [taskInputFor, setTaskInputFor] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');

  // General task add (for member view)
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    loadAll();
  }, [id]);

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([
      fetchProject(),
      fetchMembers(),
      fetchTasks(),
      fetchUserRole(),
      fetchAllUsers()
    ]);
    setLoading(false);
  };

  const fetchProject = async () => {
    try {
      const res = await fetch(`http://localhost:4000/project/${id}`);
      const data = await res.json();
      setProject(data);
    } catch (err) { console.error(err); }
  };

  const fetchMembers = async () => {
    try {
      const res = await fetch(`http://localhost:4000/project-members/${id}`);
      const data = await res.json();
      setMembers(data);
    } catch (err) { console.error(err); }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost:4000/tasks/${id}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) { console.error(err); }
  };

  const fetchUserRole = async () => {
    try {
      const res = await fetch(`http://localhost:4000/user-role/${id}/${user.id}`);
      const data = await res.json();
      setUserRole(data.role);
    } catch (err) { console.error(err); }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await fetch('http://localhost:4000/users');
      const data = await res.json();
      setAllUsers(data);
    } catch (err) { console.error(err); }
  };

  const handleAddMember = async (userId) => {
    try {
      await fetch('http://localhost:4000/add-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, projectId: id, role: 'member' })
      });
      fetchMembers();
      fetchAllUsers();
    } catch (err) { console.error(err); }
  };

  const handleRemoveMember = async (memberId) => {
    const confirmRemove = window.confirm(
      "Remove this member from project?"
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
      alert("Failed to remove member");
    }
  };

  const handleCreateTaskForMember = async (memberId) => {
    if (!taskTitle.trim()) return;

    try {
      await fetch('http://localhost:4000/create-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: id,
          userId: memberId,
          title: taskTitle
        })
      });
      setTaskTitle('');
      setTaskInputFor(null);
      fetchTasks();
      fetchMembers();
    } catch (err) { console.error(err); }
  };

  const handleToggleTask = async (taskId) => {
    try {
      await fetch(`http://localhost:4000/toggle-task/${taskId}`, {
        method: 'PUT'
      });
      fetchTasks();
      fetchMembers();
    } catch (err) { console.error(err); }
  };

  const handleDeleteProject = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await fetch(`http://localhost:4000/delete-project/${id}`, {
        method: 'DELETE'
      });
      navigate('/dashboard');
    } catch (err) { console.error(err); }
  };

  const getProgressClass = (progress) => {
    if (progress === 100) return 'complete';
    if (progress >= 60) return 'high';
    return '';
  };

  const memberIds = members.map(m => m.id);
  const nonMembers = allUsers.filter(u => !memberIds.includes(u.id));

  // For member view, show only tasks assigned to current user
  const myTasks = tasks.filter(t => t.user_id === user?.id);
  const isAdmin = userRole === 'admin';

  if (loading) {
    return <div className="loading-state">Loading project...</div>;
  }

  if (!project) {
    return <div className="loading-state">Project not found</div>;
  }

  return (
    <div className="project-detail">
      <div className="project-detail-inner">
        {/* Header */}
        <div className="project-detail-header">
          <button className="back-link" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>

          <div className="project-title-row">
            <h1>{project.project_name}</h1>
            <span className={`role-badge-large ${userRole}`}>
              {userRole}
            </span>
          </div>

          {project.description && (
            <p className="project-desc">{project.description}</p>
          )}

          {isAdmin && (
            <div className="project-actions-bar">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowAddMember(true)}
              >
                👥 Add Member
              </button>
              <button
                className="delete-project-btn"
                onClick={handleDeleteProject}
              >
                🗑 Delete Project
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="project-content">
          {/* Members Panel */}
          <div className="members-panel">
            <div className="panel-header">
              <h2>👥 Members</h2>
            </div>

            <div className="panel-card">
              {members.length === 0 ? (
                <div className="empty-tasks">No members yet</div>
              ) : (
                members.map((member, index) => (
                  <div key={member.id}>
                    <div className="member-item">
                      <div className={`member-avatar ${index % 2 === 0 ? '' : 'cyan'}`}>
                        {member.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="member-info">
                        <div className="member-name">{member.name}</div>
                        <div className="member-role-tag">{member.role}</div>
                      </div>

                      <div className="member-progress">
                        <div className="progress-bar-container">
                          <div className="progress-bar">
                            <div
                              className={`progress-fill ${getProgressClass(member.progress)}`}
                              style={{ width: `${member.progress}%` }}
                            />
                          </div>
                          <span className="progress-text">{member.progress}%</span>
                        </div>
                      </div>

                      {isAdmin && (
                        <div className="member-actions">
                          <button className="member-add-task-btn"
                            onClick={() => {setTaskInputFor(taskInputFor === member.id ? null : member.id);
                              setTaskTitle('');
                            }}
                          >
                            + Task
                          </button>
                          {member.role !== 'admin' && (
                            <button className="remove-member-btn"
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Inline task input for admin */}
                    {isAdmin && taskInputFor === member.id && (
                      <div className="inline-task-input">
                        <input
                          type="text"
                          placeholder={`Add task for ${member.name}...`}
                          value={taskTitle}
                          onChange={(e) => setTaskTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreateTaskForMember(member.id);
                          }}
                          autoFocus
                        />
                        <button onClick={() => handleCreateTaskForMember(member.id)}>
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tasks Panel */}
          <div className="tasks-panel">
            <div className="panel-header">
              <h2>📋 Tasks</h2>
            </div>

            <div className="panel-card">
              {isAdmin ? (
                // Admin: see all tasks
                tasks.length === 0 ? (
                  <div className="empty-tasks">
                    No tasks yet. Click "+ Task" on a member to assign one.
                  </div>
                ) : (
                  tasks.map(task => (
                    <div key={task.id} className="task-item">
                      <button
                        className={`task-checkbox ${task.is_completed ? 'checked' : ''}`}
                        onClick={() => handleToggleTask(task.id)}
                      >
                        {task.is_completed ? '✓' : ''}
                      </button>
                      <div className="task-info">
                        <div className={`task-title ${task.is_completed ? 'completed' : ''}`}>
                          {task.title}
                        </div>
                        <div className="task-assignee">
                          Assigned to {task.assigned_to_name}
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                // Member: see only their tasks
                <>
                  {myTasks.length === 0 ? (
                    <div className="empty-tasks">
                      No tasks assigned to you yet.
                    </div>
                  ) : (
                    myTasks.map(task => (
                      <div key={task.id} className="task-item">
                        <button
                          className={`task-checkbox ${task.is_completed ? 'checked' : ''}`}
                          onClick={() => handleToggleTask(task.id)}
                        >
                          {task.is_completed ? '✓' : ''}
                        </button>
                        <div className="task-info">
                          <div className={`task-title ${task.is_completed ? 'completed' : ''}`}>
                            {task.title}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="add-member-modal" onClick={() => setShowAddMember(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Add Member to Project</h3>

            <div className="modal-members-list">
              {nonMembers.length === 0 ? (
                <div className="empty-tasks">All users are already members</div>
              ) : (
                nonMembers.map(u => (
                  <div key={u.id} className="modal-member-item">
                    <div className="modal-member-info">
                      <div className="member-avatar">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="member-name">{u.name}</div>
                        <div className="member-role-tag">{u.email}</div>
                      </div>
                    </div>
                    <button
                      className="modal-btn-add"
                      onClick={() => handleAddMember(u.id)}
                    >
                      Add
                    </button>
                  </div>
                ))
              )}
            </div>

            <button className="modal-close" onClick={() => setShowAddMember(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
