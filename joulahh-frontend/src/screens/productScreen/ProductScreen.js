import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../../store/actions/productDetailsAction";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import "./productScreen.css";
import Rating from "../../components/rating/Rating";

const ProductScreen = (props) => {
  const productDetailsReducer = useSelector(
    (state) => state.productDetailsReducer
  );
  const { error, loading, product } = productDetailsReducer;
  const { id } = useParams(); // in id az click kardan bar rooye <a> haye axe mahsool ya esme mahsool too safheye avavl(Product.js) be dast miad
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  if (!product) {
    return <div>product not found!</div>;
  }

  const addToCartHandler = () => {
    props.history.push(`/cart/${id}?qty=${qty}`); //ba in mirim tooye CartScreen.js pas param va search parameter ro tooye CartScreen dar vaghe az inja migirim.
  };

  return (
    <div className="productScreenContainer">
      {loading ? (
        <div className="productScreenLoadingBox">
          <LoadingBox />
        </div>
      ) : error ? (
        <div className="productScreenMsgBox">
          <MessageBox variant="danger"> {error}</MessageBox>
        </div>
      ) : (
        <div className="productScreen">
          <Link to="/">برگشت به محصولات</Link>
          <div className='productDetailsWrapper'>
          <div className="imgWrapper">
            <img className="large" src={product.image} alt={product.name} />
          </div>
          <div className='detailsWrapper'>
          <div className="details1">
            <ul>
              <li>
                <h3>{product.name}</h3>
              </li>
              <li className='rate'>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </li>
              <li className='desc'>{product.description} : توضیحات </li>
            </ul>
          </div>
          <div className="details2">
              <ul>
                <li  className="price">
                    تومان <b>{product.price}</b> : قیمت
                </li>
                <li> 
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">در انبار موجود است</span>
                    ) : (
                      <span className="danger">موجود نیست</span>
                    )}
                  </div>
                </li>
                {product.countInStock > 0 && (
                  <li>
                    <div>
                      <div>: تعداد</div>
                      <div>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (x, i) => {
                              return (
                                <option key={i} value={i + 1}>
                                  {i + 1}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </div>
                    </div>
                    <li>
                      <button
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </button>
                    </li>
                  </li>
                )}
              </ul>
          </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};
export default ProductScreen;
