import { useEffect, useState } from 'react';
import { getAllProducts } from '../api/productApi';
import { Link } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : (data.products || []));
      } catch (err) {
        alert("Không lấy được danh sách sản phẩm!");
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="loading">🎪 Đang tải sản phẩm...</div>;

  return (
    <div className="container">
      <h2>🎈 Cửa Hàng Đồ Chơi Vui Nhộn 🎈</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-card-content">
              <h4>🧸 {product.name}</h4>
              <img 
                src={product.image ? `http://localhost:5000/${product.image.replace(/\\/g, '/')}` : 'https://via.placeholder.com/200'} 
                alt={product.name} 
              />
              <p className="price">💰 {product.price.toLocaleString()} đ</p>
              <Link to={`/product/${product._id}`}>
                <button>👀 Xem chi tiết</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

