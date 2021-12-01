import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./screens/header/Header";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import SigninScreen from "./screens/signinScreen/SigninScreen";
import ProductsScreen from "./screens/productsScreen/ProductsScreen";
import ProductScreen from "./screens/productScreen/ProductScreen";
import CartScreen from "./screens/cartScreen/CartScreen.jsx";
import ShippingAddressScreen from "./screens/shippingScreen/ShippingAddressScreen";
import PlaceOrderScreen from "./screens/placeOrderScreen/PlaceOrderScreen";
import RegisterScreen from "./screens/registerScreen/RegisterScreen";
import OrderScreen from "./screens/orderScreen/OrderScreen.jsx";

const App = () => {
  const [adminDrop, setAdminDrop] = useState(false);
  const [userDrop, setUserDrop] = useState(false);

  const dropDownQuitHandler = () => {
    if (userDrop || adminDrop) {
      setAdminDrop(false);
      setUserDrop(false);
    } else {
      return;
    }
  };
  const headerUserDropDownHandler = () => {
    setAdminDrop(false);
    setUserDrop(!userDrop);
  };
  const headerAdminDropDownHandler = () => {
    setAdminDrop(!adminDrop);
    setUserDrop(false);
  };

  return (
    <BrowserRouter>
      <div className="container" onClick={dropDownQuitHandler}>
        <Header
          adminDrop={adminDrop}
          userDrop={userDrop}
          headerUserDropDownHandler={headerUserDropDownHandler}
          headerAdminDropDownHandler={headerAdminDropDownHandler}
        />
        <div className="main">
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/product/:id" exact component={ProductScreen} />
            <Route path="/cart/:id" component={CartScreen} />
            <Route path="/cart" component={CartScreen} />
            {/*goft baraye in akhare path ? gozashte ke age yedafe karbar raft safheye /cart faghat safheye shopping cart bedoone mahsool namyesh dade beshe */}
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/shipping" component={ShippingAddressScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/orderhistory" component={OrderHistoryScreen} />
            <PrivateRoute path="/profile" component={ProfileScreen} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
