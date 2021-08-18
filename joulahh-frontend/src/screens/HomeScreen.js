import React, { useEffect} from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/actions/index";


const HomeScreen = () => {

const dispatch = useDispatch();
const productList = useSelector(state => state.productListReducer);          //az tooye store tooye index.js
const {loading, error, products} = productList;

  

  useEffect(() => {
    
      dispatch(listProducts());

  },[]);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox varaint='danger'>{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
