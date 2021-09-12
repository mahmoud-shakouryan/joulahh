import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./screens/Header";

const Main = () => {
  useEffect(() => {
    document.title = "جولاه : صفحه اصلی";
  }, []);
  return (
    <div className="grid-container">
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/product/:id" exact component={ProductScreen} />
          <Route path="/cart/:id" component={CartScreen} />{" "}
          {/*goft baraye in akhare path ? gozashte ke age yedafe karbar raft safheye /cart faghat safheye shopping cart bedoone mahsool namyesh dade beshe */}
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />
        </Switch>
      </main>
    </div>
  );
};

export default Main;
