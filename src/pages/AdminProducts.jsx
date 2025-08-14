import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: null });
  const [preview, setPreview] = useState(null);

  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data.products || res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    if (form.image) formData.append('image', form.image);

    await axios.post(
      'http://localhost:5000/api/products',
      formData,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
    );
    setForm({ name: '', price: '', description: '', image: null });
    setPreview(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditing(product._id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description || '',
      image: null
    });
    setPreview(product.image ? `http://localhost:5000/${product.image.replace(/\\/g, '/')}` : null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    if (form.image) formData.append('image', form.image);

    await axios.put(
      `http://localhost:5000/api/products/${editing}`,
      formData,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
    );
    setEditing(null);
    setForm({ name: '', price: '', description: '', image: null });
    setPreview(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ Xác nhận xoá sản phẩm này?")) return;
    await axios.delete(
      `http://localhost:5000/api/products/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchProducts();
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ name: '', price: '', description: '', image: null });
    setPreview(null);
  };

  return (
    <div className="container">
      <h2>⚙️ Quản lý sản phẩm</h2>
      
      <div className="admin-form">
        <form onSubmit={editing ? handleUpdate : handleAdd} encType="multipart/form-data">
          <input 
            name="name" 
            placeholder="🧸 Tên sản phẩm" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="price" 
            type="number" 
            placeholder="💰 Giá" 
            value={form.price} 
            onChange={handleChange} 
            required 
          />
          <textarea 
            name="description" 
            placeholder="📝 Mô tả sản phẩm" 
            value={form.description} 
            onChange={handleChange} 
            rows="3"
          />
          <input 
            name="image" 
            type="file" 
            accept="image/*" 
            onChange={handleChange} 
          />
          {preview && (
            <img src={preview} alt="preview" className="preview-image" />
          )}
          <div>
            <button type="submit" className="btn-primary">
              {editing ? "✏️ Cập nhật" : "➕ Thêm mới"}
            </button>
            {editing && (
              <button type="button" onClick={handleCancel} className="btn-cancel">
                ❌ Huỷ
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>🧸 Tên</th>
              <th>💰 Giá</th>
              <th>📝 Mô tả</th>
              <th>🖼️ Ảnh</th>
              <th>⚙️ Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>{prod.price.toLocaleString()} đ</td>
                <td>{prod.description}</td>
                <td>
                  {prod.image ? (
                    <img 
                      src={`http://localhost:5000/${prod.image.replace(/\\/g, '/')}`} 
                      width={60} 
                      alt={prod.name}
                      style={{ borderRadius: 8 }}
                    />
                  ) : (
                    <img src="https://via.placeholder.com/60" width={60} alt="noimg" />
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(prod)} className="btn-edit">
                    ✏️ Sửa
                  </button>
                  <button onClick={() => handleDelete(prod._id)} className="btn-delete">
                    🗑️ Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;
