import { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirm) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      // Gọi API đăng ký
      await axios.post('http://localhost:5000/api/users/register', {
        username, email, password
      });
      setSuccess('Đăng ký thành công! Bạn có thể đăng nhập.');
      // Reset form (nếu muốn)
      setUsername(''); setEmail(''); setPassword(''); setConfirm('');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại!');
    }
  };

  return (
    <div className="form-box">
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text" placeholder="Username" value={username}
          onChange={e => setUsername(e.target.value)} required
        /><br />
        <input
          type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required
        /><br />
        <input
          type="password" placeholder="Mật khẩu" value={password}
          onChange={e => setPassword(e.target.value)} required
        /><br />
        <input
          type="password" placeholder="Nhập lại mật khẩu" value={confirm}
          onChange={e => setConfirm(e.target.value)} required
        /><br />
        <button type="submit">Đăng ký</button>
      </form>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {success && <div style={{color: 'green'}}>{success}</div>}
    </div>
  );
}

export default RegisterPage;
