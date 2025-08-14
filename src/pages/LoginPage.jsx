import { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { username, password });
      // Lưu token vào localStorage hoặc state
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('role', res.data.role); // Thêm dòng này!


      alert('Đăng nhập thành công!');
      // chuyển hướng sang trang chủ (nếu muốn)
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại!');
    }
  };

  return (
    <div className="form-box">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text" placeholder="Username"
          value={username} onChange={e => setUsername(e.target.value)} required
        />
        <input
          type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} required
        />
        <button type="submit">Đăng nhập</button>
        {error && <div style={{color: 'red'}}>{error}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
