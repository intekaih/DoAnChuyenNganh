import { Link } from 'react-router-dom';

function Navbar() {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <nav>
      <div className="nav-left">
        <Link to="/">🏠 Trang chủ</Link>
        <Link to="/cart">🛒 Giỏ hàng</Link>
        <Link to="/orders">📦 Đơn hàng của tôi</Link>
        {role === 'admin' && (
          <Link to="/admin/products">⚙️ Quản lý sản phẩm</Link>
        )}
      </div>
      <div className="nav-right">
        {username ? (
          <>
            <span className="user-info">👋 Xin chào <b>{username}</b></span>
            <button onClick={handleLogout}>🚪 Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login">🔐 Đăng nhập</Link>
            <Link to="/register">📝 Đăng ký</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
