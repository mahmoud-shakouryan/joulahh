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
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import { useState } from 'react';

const  App = () => {

  const [dropDown, setDropDown] = useState(false);
  
  const cartItems = useSelector(state => state.cartReducer).cartItems;
  const userSignin = useSelector(state=>state.userSigninReducer);
  const { userInfo } = userSignin;
  
  const dispatch = useDispatch();
  const signoutHandler = () => {
      dispatch({type:actions.SIGNOUT})     //?? ajiibe chera borde boodam ino too userActions ba dispatch amal nakard?
  }                                            // fek konam chon oonja ba dispatch mineveshtam . return dispatch => ... . dar hali ke oon male karaye async'e.

  const dropDownHandler = () => {
    setDropDown(!dropDown);
  }
  
  
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="header">
        <div className='brand'>
          <Link  to="/">
            Joulahh
          </Link>
        </div>
        <div className='navLinks'>
          <div className='cart-badge'>
          {userInfo && <Link to="/cart">سبد</Link>}
          {cartItems.length > 0 && userInfo &&(
            <span className='badge'>{cartItems.length}</span>
          )}
            </div>
          {
            userInfo ? (
              <div className='dropdown'>
              <Link to='#' onClick={dropDownHandler}>{userInfo.name}<i className='fa fa-caret-down arrow'></i></Link>
              <ul className={dropDown ? 'dropdown-content active' : 'dropdown-content'}>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/orderhistory'>Order History</Link></li>
                <li><Link to='#' onClick={signoutHandler} >Sign Out</Link></li>
              </ul>
              </div>
            ) 
          :<div><Link to="/signin">Sign In</Link></div>
          }
          { userInfo && userInfo.isAdmin && (
            <div className={dropDown ? 'dropdown-content active' : 'dropdown-content'}>
              <Link to='#admin' onClick={dropDownHandler}>ادمین<i className='fa fa-caret-down arrow'></i></Link>
              <ul className={dropDown ? 'active' : ''}>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <Link to='/productlist'>Products</Link>
                </li>
                <li>
                  <Link to='/orderlist'>Orders</Link>
                </li>
                <li>
                  <Link to='/userlist'>Users</Link>
                </li>
              </ul>
              </div>
          )}
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
        <PrivateRoute path='/profile' component={ProfileScreen}/>
        </Switch>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
