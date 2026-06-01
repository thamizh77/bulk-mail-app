import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

function AppLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Bulk Mail App</p>
          <h1>Email Console</h1>
        </div>
        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink to="/send">Send Bulk Email</NavLink>
          <NavLink to="/history">Email History</NavLink>
        </nav>
        <button className="ghost-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
