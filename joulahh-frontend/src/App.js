import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">
            amazona
          </a>
        </div>
        <div>
          <a href="/cart">Cart</a>
          <a href="/signin">Sign In</a>
        </div>
      </header>
      <main>
        <Switch>
        <Route path='/' exact component={HomeScreen}></Route>
        <Route path='/product/:id' exact component={ProductScreen}></Route>
        <Route path='/cart/:id?' component={CartScreen}></Route>  {/*goft baraye in akhare path ? gozashte ke age yedafe karbar raft safheye /cart faghat safheye shopping cart bedoone mahsool namyesh dade beshe */}
        </Switch>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
