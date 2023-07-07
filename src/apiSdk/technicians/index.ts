import axios from 'axios';
import queryString from 'query-string';
import { TechnicianInterface, TechnicianGetQueryInterface } from 'interfaces/technician';
import { GetQueryInterface } from '../../interfaces';

export const getTechnicians = async (query?: TechnicianGetQueryInterface) => {
  const response = await axios.get(`/api/technicians${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTechnician = async (technician: TechnicianInterface) => {
  const response = await axios.post('/api/technicians', technician);
  return response.data;
};

export const updateTechnicianById = async (id: string, technician: TechnicianInterface) => {
  const response = await axios.put(`/api/technicians/${id}`, technician);
  return response.data;
};

export const getTechnicianById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/technicians/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTechnicianById = async (id: string) => {
  const response = await axios.delete(`/api/technicians/${id}`);
  return response.data;
};
