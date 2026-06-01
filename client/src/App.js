import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import History from './pages/History';
import Login from './pages/Login';
import SendBulkEmail from './pages/SendBulkEmail';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/send" replace />} />
        <Route path="send" element={<SendBulkEmail />} />
        <Route path="history" element={<History />} />
      </Route>
      <Route path="*" element={<Navigate to="/send" replace />} />
    </Routes>
  );
}

export default App;
