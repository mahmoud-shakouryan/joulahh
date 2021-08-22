import { useSelector} from 'react-redux';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
const  App = () => {
  
  const cartItems = useSelector(state => state.cartReducer).cartItems;
  
  
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
          {cartItems.length > 0 && (
            <span className='badge'>{cartItems.length}</span>
          )}
          <Link to="/signin">Sign In</Link>
        </div>
      </header>
      <main>
        <Switch>
        <Route path='/' exact component={HomeScreen}/>
        <Route path='/product/:id' exact component={ProductScreen}/>
        <Route path='/cart/:id' component={CartScreen}/>  {/*goft baraye in akhare path ? gozashte ke age yedafe karbar raft safheye /cart faghat safheye shopping cart bedoone mahsool namyesh dade beshe */}
        </Switch>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
