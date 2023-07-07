import { ShopInterface } from 'interfaces/shop';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  profile?: string;
  shop_id?: string;
  created_at?: any;
  updated_at?: any;

  shop?: ShopInterface;
  _count?: {};
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  profile?: string;
  shop_id?: string;
}
