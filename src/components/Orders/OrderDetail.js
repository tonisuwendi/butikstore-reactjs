/* eslint-disable react/no-danger */

import ProductList from '../Cart/ProductList';
import { dateFormat, printFormatPrice } from '../../lib/function';

import classes from './OrderDetail.module.css';

const OrderDetail = ({ order, products }) => (
  <>
    <div className={classes.order}>
      <div className={classes.orderItem}>
        <h4>Order Number</h4>
        <p>{order.order_number}</p>
        <h4>Total</h4>
        <p>{`Rp${printFormatPrice(order.total)}`}</p>
        <h4>Date</h4>
        <p>{dateFormat(order.date_order)}</p>
      </div>
      <div className={classes.orderItem}>
        {order.notes && (
          <>
            <h4>Note</h4>
            <p>{order.notes}</p>
          </>
        )}
        <h4>Shipping Address</h4>
        <p>{order.name}</p>
        <p>
          <span
            dangerouslySetInnerHTML={{ __html: order.address.replace('\n', '<br/>') }}
          />
          {' - '}
          {order.postal_code}
        </p>
        <p>{order.phone}</p>
      </div>
    </div>
    <div className={classes.products}>
      <h4>Order details</h4>
      <ProductList products={products} />
    </div>
  </>
);

export default OrderDetail;
