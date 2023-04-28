export type PaymentMethod =
  | 'Credit card'
  | 'Debit card'
  | 'PayPal'
  | 'Apple Pay'
  | 'Google Pay'
  | 'Bank transfer'
  | 'Cash on delivery';

const paymentMethods: PaymentMethod[] = [
  'Credit card',
  'Debit card',
  'PayPal',
  'Apple Pay',
  'Google Pay',
  'Bank transfer',
  'Cash on delivery',
];

export default paymentMethods;
