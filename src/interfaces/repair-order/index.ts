import { TechnicianInterface } from 'interfaces/technician';
import { ShopInterface } from 'interfaces/shop';
import { GetQueryInterface } from 'interfaces';

export interface RepairOrderInterface {
  id?: string;
  status?: string;
  technician_id?: string;
  shop_id?: string;
  created_at?: any;
  updated_at?: any;

  technician?: TechnicianInterface;
  shop?: ShopInterface;
  _count?: {};
}

export interface RepairOrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  technician_id?: string;
  shop_id?: string;
}
