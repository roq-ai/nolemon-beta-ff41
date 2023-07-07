import { ShopInterface } from 'interfaces/shop';
import { GetQueryInterface } from 'interfaces';

export interface AppointmentInterface {
  id?: string;
  time?: any;
  shop_id?: string;
  created_at?: any;
  updated_at?: any;

  shop?: ShopInterface;
  _count?: {};
}

export interface AppointmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  shop_id?: string;
}
