export type Status =
  | 'Pending'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned'
  | 'Backorder'
  | 'Preorder';

const status: Status[] = [
  'Pending',
  'Shipped',
  'Delivered',
  'Cancelled',
  'Returned',
  'Backorder',
  'Preorder',
];

export default status;
