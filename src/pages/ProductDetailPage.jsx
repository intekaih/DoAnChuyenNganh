import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch {
        setProduct(null);
      }
    })();
  }, [id]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.productId === product._id);
    if (index >= 0) {
      cart[index].quantity += 1;
    } else {
      cart.push({ productId: product._id, name: product.name, price: product.price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('🎉 Đã thêm vào giỏ hàng!');
  };

  if (!product) return <div className="loading">❌ Không tìm thấy sản phẩm!</div>;

  return (
    <div className="container">
      <div className="form-box" style={{ maxWidth: 600 }}>
        <h2>🧸 {product.name}</h2>
        <img 
          src={product.image ? `http://localhost:5000/${product.image.replace(/\\/g, '/')}` : 'https://via.placeholder.com/300'} 
          width="100%" 
          style={{ marginBottom: 20, borderRadius: 15 }} 
          alt={product.name}
        />
        <p className="price">💰 <b>Giá:</b> {product.price?.toLocaleString()} đ</p>
        <p>📝 <b>Mô tả:</b> {product.description}</p>
        <button onClick={handleAddToCart} className="btn-primary">
          🛒 Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;
