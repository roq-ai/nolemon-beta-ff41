const mapping: Record<string, string> = {
  appointments: 'appointment',
  customers: 'customer',
  invoices: 'invoice',
  'repair-orders': 'repair_order',
  shops: 'shop',
  technicians: 'technician',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
