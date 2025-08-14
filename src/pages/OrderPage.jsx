import { useState, useEffect } from 'react';
import axios from 'axios';

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/orders/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        alert('Không lấy được danh sách đơn hàng!');
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Đang tải đơn hàng...</p>;

  return (
    <div>
      <h2>Đơn hàng của tôi</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <table border="1" cellPadding={8}>
          <thead>
            <tr>
              <th>ID Đơn</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
              <th>Chi tiết sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>{order.totalAmount.toLocaleString()} đ</td>
                <td>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.product}>
                        {item.quantity} x {item.product.name || item.product} ({item.price.toLocaleString()} đ)
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderPage;