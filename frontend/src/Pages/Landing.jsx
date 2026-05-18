import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Project Management Reimagined
          </div>

          <h1>
            Build better projects,{' '}
            <span className="highlight">together.</span>
          </h1>

          <p className="hero-subtitle">
            Streamline your workflow with powerful project management. 
            Create projects, assign tasks, track progress — all in one beautiful place.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary">
              Get Started Free →
            </Link>
            <Link to="/signin" className="btn btn-secondary">
              Sign In
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2.5k</div>
              <div className="stat-label">Team Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="section-header">
          <div className="section-tag">✦ Features</div>
          <h2>Everything you need</h2>
          <p>Powerful tools to manage projects, teams, and tasks with zero friction.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon purple">🚀</div>
            <h3>Create Projects</h3>
            <p>Spin up new projects in seconds with titles, descriptions, and team member selection.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon cyan">👥</div>
            <h3>Team Management</h3>
            <p>Add members, assign roles, and manage your team all from one central dashboard.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">📋</div>
            <h3>Task Tracking</h3>
            <p>Create tasks, assign them to members, and track completion with live progress bars.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon purple">📊</div>
            <h3>Progress Insights</h3>
            <p>Real-time progress tracking per member. See who's on track and who needs help.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon cyan">🔒</div>
            <h3>Role-Based Access</h3>
            <p>Admin and member roles with different permissions. Control who can do what.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Built for speed. Instant updates, minimal load times, and smooth interactions.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>Ready to get started?</h2>
          <p>Join hundreds of teams already shipping faster with Projj.</p>
          <Link to="/signup" className="btn btn-primary">
            Create Your Account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>© 2026 Projj. Built with ❤️</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
