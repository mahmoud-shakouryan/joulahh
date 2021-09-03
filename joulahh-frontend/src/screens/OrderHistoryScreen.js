import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const OrderHistoryScreen = (props) => {
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    return (
        <div>
            <h1>Order History</h1>
            { loading ? <LoadingBox/> : error ? <MessageBox variant="danger">{error}</MessageBox>:(
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => (
                                <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.subString(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.subString(0,10) : 'No'}</td>
                                <td>{isDelivered ? order.deliveredAt.subString(0,10) : 'No'}</td>
                                <td><button type='button' className='small' onClick={props.history.push(`/order/${order._id}`)}>Details</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default OrderHistoryScreen
