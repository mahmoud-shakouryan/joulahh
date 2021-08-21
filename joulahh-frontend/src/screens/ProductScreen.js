import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import { Link, Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../store/actions/productDetailsAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ProductScreen = (props) => {
  console.log('rendering ProductScreen.js')
  const productDetailsReducer = useSelector(
    (state) => state.productDetailsReducer
  );
  const { error, loading, product } = productDetailsReducer;
  const { id } = useParams();          // in id az click kardan bar rooye <a> haye axe mahsool ya esme mahsool too safheye avavl(Product.js) be dast miad
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  
  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch,id]);

  if (!product) {
    return <div>product not found!</div>;
  }

  const addToCartHandler = () => {
    console.log('addToCartHandler')
     props.history.push(`/cart/${id}?qty=${qty}`);       //ba in mirim tooye CartScreen.js pas param va search parameter ro tooye CartScreen dar vaghe az inja migirim.
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
                    { product.countInStock > 0 && (
                      <> 
                      <div className='row'>
                        <div>Qty</div>
                        <div>
                          <select value={qty} onChange={e=>setQty(e.target.value)}>
                            {
                              
                              [...Array(product.countInStock).keys()].map((x,i)=>{
                                return <option key={i} value={i+1}>{i+1}</option>
                              })
                            }
                          </select>
                        </div>
                      </div>
                      <li>
                      <button className="primaty block" onClick={addToCartHandler}>Add To Cart</button>
                      </li>
                    </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          )}
         </div>
)}
export default ProductScreen;
