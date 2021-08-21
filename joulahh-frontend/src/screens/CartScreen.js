import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/actions/cartActions';

const CartScreen = (props) => {
    // const productId = props.match.params.id;
    const {id} = useParams();
    const searchParam = props.location.search; // in oon ghesmate belafasele baad az ? ro mide yaani >>> qty={qty}
    const qty = searchParam  ?  searchParam.split('=')[1] : 1;

    const dispatch = useDispatch();
    useEffect(() => {              // hala vaghte vasl shodan be backende'e
            if(id){
                dispatch(addToCart(id, qty));
            }
    },[dispatch, id, qty])


    return (
        <div>
            <h1>CartScreen</h1>
            <p>Add To Cart : productId : {id} Qty : {qty}</p>
        </div>
    )
}

export default CartScreen
