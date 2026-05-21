import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to={user ? '/dashboard' : '/'} className="navbar-logo">
          <div className="logo-icon">⚡</div>
          <span>Projj</span>
        </Link>

        <div className="navbar-links">
          {user ? (
            <>
              <div className="navbar-user">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
              </div>
              <Link to="/dashboard" className="nav-btn-outline">Dashboard</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signin">Sign In</Link>
              <Link to="/signup" className="nav-btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
