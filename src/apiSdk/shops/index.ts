import axios from 'axios';
import queryString from 'query-string';
import { ShopInterface, ShopGetQueryInterface } from 'interfaces/shop';
import { GetQueryInterface } from '../../interfaces';

export const getShops = async (query?: ShopGetQueryInterface) => {
  const response = await axios.get(`/api/shops${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createShop = async (shop: ShopInterface) => {
  const response = await axios.post('/api/shops', shop);
  return response.data;
};

export const updateShopById = async (id: string, shop: ShopInterface) => {
  const response = await axios.put(`/api/shops/${id}`, shop);
  return response.data;
};

export const getShopById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/shops/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteShopById = async (id: string) => {
  const response = await axios.delete(`/api/shops/${id}`);
  return response.data;
};
