import { Link } from 'react-router-dom';

import Button from '../UI/Button/Button';
import { dateFormat, printFormatPrice } from '../../lib/function';

const OrderItem = ({ number, order }) => (
  <tr>
    <td>{number}</td>
    <td>{order.order_number}</td>
    <td>{dateFormat(order.date_order)}</td>
    <td>{`Rp${printFormatPrice(order.total)}`}</td>
    <td>
      <Link to={`/dashboard/order/${order.order_number}?id=${order.id}&phone=${order.phone}`}>
        <Button title="View" size="smv2" outline />
      </Link>
    </td>
  </tr>
);

export default OrderItem;
