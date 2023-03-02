import axios from 'axios';
import { Product } from './types/product';
import { Comment } from './types/comment';

const BASE_URL = 'http://localhost:8080';

export async function getProducts() {
  const result: Product[] = await axios.get(`${BASE_URL}/phones`)
    .then(data => data.data);
  return result;
};

export async function getProduct(phoneId: number) {
  const result: Product = await axios.get(`${BASE_URL}/phones/${phoneId}`)
    .then(data => data.data);
  return result;
};

export async function updateProduct(
  phoneId: number, 
  imageUrl: string, 
  name: string,
  count: number, 
  width: number, 
  height: number, 
  weight: string
  ) {
  const result: Product = await axios.patch(`${BASE_URL}/phones/${phoneId}`, {
    imageUrl,
    name,
    count,
    size: {
      width,
      height,
    },
    weight,
  })
    .then(data => data.data);
  return result;
};

export async function getComment(phoneId: number) {
  const result: Comment[] = await axios.get(`${BASE_URL}/comments/?productId=${phoneId}`)
    .then(response => response.data);
  return result;
};

export async function createComment(description: string, productId: number) {
  const result: Comment = await axios.post(`${BASE_URL}/comments`, {
    productId: productId,
    description: description,
    date: (new Date()).toISOString()
  })
    .then(data => data.data);
  return result;
};

export async function deleteComment(id: number) {
  await axios.delete(`${BASE_URL}/comments/${id}`, {
    data: id,
  });
  return id;
};
