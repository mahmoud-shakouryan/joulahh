import React, { useEffect } from "react";
import Rating from "../components/Rating";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../store/actions/productDetailsAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ProductScreen = (props) => {
  const productDetailsReducer = useSelector(
    (state) => state.productDetailsReducer
  );
  const { error, loading, product } = productDetailsReducer;
  const { id } = useParams();
  const dispatch = useDispatch();

  

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, []);

  if (!product) {
    return <div>product not found!</div>;
  }

  return (
      <div>
          {loading ? (
              <LoadingBox/>
          ): error ?(
              <MessageBox variant='danger' > {error}</MessageBox>
          ) : (
            <div>
            <Link to="/">Back To Result</Link>
            <div className="row top">
              <div className="col-2 ProductWrapper">
                <img className="large" src={product.image} alt={product.name} />
              </div>
              <div className="col-1">
                <ul>
                  <li>
                    <h1>{product.name}</h1>
                  </li>
                  <li>
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                  </li>
                  <li>Price : ${product.price}</li>
                  <li>Description : {product.description}</li>
                </ul>
              </div>
              <div className="col-1">
                <div className="card card-body">
                  <ul>
                    <li>
                      <div className="row">
                        <div>Price</div>
                        <div className="price">${product.price}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Status</div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Not Available</span>
                        )}
                      </div>
                    </li>
                    <li>
                      <button className="primaty block">Add To Cart</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          )}
         </div>
)}
export default ProductScreen;
