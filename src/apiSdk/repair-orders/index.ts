import axios from 'axios';
import queryString from 'query-string';
import { RepairOrderInterface, RepairOrderGetQueryInterface } from 'interfaces/repair-order';
import { GetQueryInterface } from '../../interfaces';

export const getRepairOrders = async (query?: RepairOrderGetQueryInterface) => {
  const response = await axios.get(`/api/repair-orders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRepairOrder = async (repairOrder: RepairOrderInterface) => {
  const response = await axios.post('/api/repair-orders', repairOrder);
  return response.data;
};

export const updateRepairOrderById = async (id: string, repairOrder: RepairOrderInterface) => {
  const response = await axios.put(`/api/repair-orders/${id}`, repairOrder);
  return response.data;
};

export const getRepairOrderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/repair-orders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRepairOrderById = async (id: string) => {
  const response = await axios.delete(`/api/repair-orders/${id}`);
  return response.data;
};
