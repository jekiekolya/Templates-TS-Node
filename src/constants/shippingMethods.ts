export type ShippingMethod =
  | 'Standard'
  | 'Express'
  | 'Same-day delivery'
  | 'In-store pickup';

const shippingMethods: ShippingMethod[] = [
  'Standard',
  'Express',
  'Same-day delivery',
  'In-store pickup',
];

export default shippingMethods;
