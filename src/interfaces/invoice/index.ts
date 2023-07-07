import { ShopInterface } from 'interfaces/shop';
import { GetQueryInterface } from 'interfaces';

export interface InvoiceInterface {
  id?: string;
  amount?: number;
  shop_id?: string;
  created_at?: any;
  updated_at?: any;

  shop?: ShopInterface;
  _count?: {};
}

export interface InvoiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  shop_id?: string;
}
