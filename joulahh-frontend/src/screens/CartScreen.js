import React from 'react'
import { useParams } from 'react-router-dom';

const CartScreen = (props) => {
    // const productId = props.match.params.id;
    const {id} = useParams();
    const searchParam = props.location.search; // in oon ghesmate belafasele baad az ? ro mide yaani >>> qty={qty}
    const qty = searchParam  ?  searchParam.split('=')[1] : 1;

    return (
        <div>
            <h1>CartScreen</h1>
            <p>Add To Cart : productId : {id} Qty : {qty}</p>
        </div>
    )
}

export default CartScreen
