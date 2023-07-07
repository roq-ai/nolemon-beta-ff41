import { AppointmentInterface } from 'interfaces/appointment';
import { CustomerInterface } from 'interfaces/customer';
import { InvoiceInterface } from 'interfaces/invoice';
import { RepairOrderInterface } from 'interfaces/repair-order';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ShopInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  appointment?: AppointmentInterface[];
  customer?: CustomerInterface[];
  invoice?: InvoiceInterface[];
  repair_order?: RepairOrderInterface[];
  user?: UserInterface;
  _count?: {
    appointment?: number;
    customer?: number;
    invoice?: number;
    repair_order?: number;
  };
}

export interface ShopGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
