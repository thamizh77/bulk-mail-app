import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import { useAuth } from '../services/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login, token } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (token) {
    return <Navigate to="/send" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.username.trim() || !form.password.trim()) {
      setError('Username and password are required.');
      return;
    }

    try {
      setLoading(true);
      await login(form);
      navigate('/send', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <p className="eyebrow">Admin Access</p>
        <h1 id="login-title">Bulk Mail App</h1>
        <p className="muted">Sign in to send campaigns and review delivery history.</p>
        <Alert type="error">{error}</Alert>
        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              placeholder="admin"
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder="Enter password"
            />
          </label>
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? <Loader label="Signing in" /> : 'Login'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
