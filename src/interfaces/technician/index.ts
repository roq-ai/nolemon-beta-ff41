import { RepairOrderInterface } from 'interfaces/repair-order';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TechnicianInterface {
  id?: string;
  efficiency_rating?: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  repair_order?: RepairOrderInterface[];
  user?: UserInterface;
  _count?: {
    repair_order?: number;
  };
}

export interface TechnicianGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
