import { useDispatch, useSelector} from 'react-redux';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen'
import * as actions from './store/actions/actionTypes';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
const  App = () => {
  
  const cartItems = useSelector(state => state.cartReducer).cartItems;
  const userSignin = useSelector(state=>state.userSigninReducer);
  const { userInfo } = userSignin;
  
  const dispatch = useDispatch();
  const signoutHandler = () => {
      dispatch({type:actions.SIGNOUT})     //?? ajiibe chetra borde boodam ino too userActions ba dispatch amal nakard?
  }                                            // fek konam chon oonja ba dispatch mineveshtam . return dispatch => ... . dar hali ke oon male karaye async'e.
  
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
            amazona
          </Link>
        </div>
        <div>
          <Link to="/cart">Cart</Link>
          {cartItems.length > 0 && userInfo &&(
            <span className='badge'>{cartItems.length}</span>
          )}
          {
            userInfo ? (
              <div className='dropdown'>
              <Link to='#'>{userInfo.name}<i className='fa fa-caret-down'></i></Link>
              <ul className='dropdown-content'>
                <li><Link to='/orderhistory'>Order History</Link></li>
                <li><Link to='#' onClick={signoutHandler} >Sign Out</Link></li>
              </ul>
              </div>
            ) 
          :<Link to="/signin">Sign In</Link>
          }
        </div>
      </header>
      <main>
        <Switch>
        <Route path='/' exact component={HomeScreen}/>
        <Route path='/product/:id' exact component={ProductScreen}/>
        <Route path='/cart/:id' component={CartScreen}/>  {/*goft baraye in akhare path ? gozashte ke age yedafe karbar raft safheye /cart faghat safheye shopping cart bedoone mahsool namyesh dade beshe */}
        <Route path='/signin' component={SigninScreen}/>
        <Route path='/register' component={RegisterScreen}/>
        <Route path='/shipping' component={ShippingAddressScreen}/>
        <Route path='/payment' component={PaymentMethodScreen}/>
        <Route path='/placeorder' component={PlaceOrderScreen}/>
        <Route path='/order/:id' component={OrderScreen}/>
        <Route path='/orderhistory' component={OrderHistoryScreen}/>
        </Switch>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
