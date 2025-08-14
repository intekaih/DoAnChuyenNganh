import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (!token || role !== 'admin') {
    alert('Bạn không có quyền truy cập!');
    return <Navigate to="/login" />;
  }
  return children;
}

export default AdminRoute;
