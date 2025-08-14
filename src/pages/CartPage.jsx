import { useState, useEffect } from 'react';
import axios from 'axios';

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("🛒 Giỏ hàng rỗng!");
      return;
    }
    
    const orderItems = cart.map(item => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price
    }));

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/orders',
        { items: orderItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('🎉 Đặt hàng thành công!');
      localStorage.removeItem('cart');
      setCart([]);
    } catch (err) {
      alert('❌ Đặt hàng thất bại!');
    }
  };

  return (
    <div className="container">
      <div className="table-box">
        <h2>🛒 Giỏ hàng của bạn</h2>
        {cart.length === 0 ? (
          <div className="loading">🛒 Giỏ hàng rỗng.</div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>🧸 Tên sản phẩm</th>
                  <th>💰 Giá</th>
                  <th>📦 Số lượng</th>
                  <th>💵 Tổng</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.productId}>
                    <td>{item.name}</td>
                    <td>{item.price.toLocaleString()} đ</td>
                    <td>{item.quantity}</td>
                    <td>{(item.price * item.quantity).toLocaleString()} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-total">
              💰 Tổng tiền: {total.toLocaleString()} đ
            </div>
            <button onClick={handleOrder} className="btn-primary" disabled={cart.length === 0}>
              🎁 Đặt hàng ngay
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
