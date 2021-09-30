import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../../store/actions/cartActions";
import MessageBox from '../../components/MessageBox';
import "./cartScreen.css";


const CartScreen = (props) => {
  // const productId = props.match.params.id;
  const { id } = useParams();
  const searchParam = props.location.search; // in oon ghesmate belafasele baad az ? ro mide yaani >>> qty={qty}
  const qty = searchParam ? searchParam.split("=")[1] : 1;

  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping"); //??? after signin user must be redirection?
  };

  const dispatch = useDispatch();
  useEffect(() => {
    // hala vaghte vasl shodan be backende'e
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return (
    <div className="cartContainer">
      <div className="cart-details">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart Is Empty <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((cartItem) => (
              <li key={cartItem.product}>
                <div className="imgWrapper">
                  <img src={cartItem.image} alt={cartItem.name} />
                </div>
                <div className="link">
                  <Link to={`/product/${cartItem.product}`}>
                    {cartItem.name}
                  </Link>
                </div>
                <div className="selectWrapper">
                  <select
                    value={cartItem.qty}
                    onChange={(e) =>
                      dispatch(addToCart(cartItem.product, e.target.value))
                    }
                  >
                    {[...Array(cartItem.countInStock).keys()].map((x, i) => {
                      return (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="priceWrapper">${cartItem.price}</div>
                <div className="buttonWrapper">
                  <button
                    type="button"
                    onClick={() => removeFromCartHandler(cartItem.product)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='cart-price-checkoutBtn'>
        <ul>
          <li>
            <h2>
              Subtotal ({cartItems.reduce((a, c) => a + +c.qty, 0)} items) : $
              {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h2>
          </li>
          <li>
            <button
              type="button"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed To Checkout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartScreen;
