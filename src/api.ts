import axios from 'axios';
import { Product } from './types/product';
import { Comment } from './types/comment';

const BASE_URL = 'http://localhost:8080';

export async function getProducts():Promise<Product[]> {
  const result = await axios.get(`${BASE_URL}/phones`)

  return result.data;
};

export async function getProduct(phoneId: number):Promise<Product> {
  const result = await axios.get(`${BASE_URL}/phones/${phoneId}`);

  return result.data;
};

export async function updateProduct(
  phoneId: number, 
  imageUrl: string, 
  name: string,
  count: number, 
  width: number, 
  height: number, 
  weight: string
  ): Promise<Product> {
    
  const result = await axios.patch(`${BASE_URL}/phones/${phoneId}`, {
    imageUrl,
    name,
    count,
    size: {
      width,
      height,
    },
    weight,
  })

  return result.data;
};

export async function createProduct(
  imageUrl: string, 
  name: string,
  count: number, 
  width: number, 
  height: number, 
  weight: string
): Promise<Product> {

  const result = await axios.post(`${BASE_URL}/phones`, {
    imageUrl,
    name,
    count,
    size: {
      width,
      height,
    },
    weight,
  });

  return result.data;
};

export async function getComment(phoneId: number):Promise<Comment[]> {
  const result = await axios.get(`${BASE_URL}/comments/?productId=${phoneId}`);

  return result.data;
};

export async function createComment(
  description: string, 
  productId: number,
  ): Promise<Comment> {

  const result = await axios.post(`${BASE_URL}/comments`, {
    productId: productId,
    description: description,
    date: (new Date()).toISOString()
  })

  return result.data;
};

export async function deleteComment(id: number) {
  await axios.delete(`${BASE_URL}/comments/${id}`, {
    data: id,
  });
  return id;
};
