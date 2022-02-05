import OrderItem from './OrderItem';

import classes from './Orders.module.css';

const OrderList = ({ orders }) => (
  <table className={classes.orders}>
    <thead>
      <tr>
        <th>No.</th>
        <th>Order Number</th>
        <th>Date</th>
        <th>Total</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order, index) => (
        <OrderItem key={order.id} number={index + 1} order={order} />
      ))}
    </tbody>
  </table>
);

export default OrderList;
