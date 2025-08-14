import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const getAllProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};