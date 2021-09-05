import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsUser } from "../store/actions/userActions";

const ProfileScreen = () => {
  const userSignin = useSelector((state) => state.userSigninReducer);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  const submitHandler = (e) => {
        e.preventDefautl();
        //dispatch update profile actions
  }
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="text"
                placeholder="enter name"
                value={user.name}
              />
            </div>
            <div>
              <label htmlFor="email">email</label>
              <input
                type="text"
                id="email"
                placeholder="enter email"
                value={user.email}
              />
            </div>
            <div>
              <label htmlFor="password">password</label>
              <input
                type="text"
                id="password"
                placeholder="enter password"
                
              />
            </div>
            <div> 
              <label htmlFor="confirmPassword">confirmPassword</label>
              <input
                type="text"
                id="confirmPassword"
                placeholder="enter confirmPassword"
              />
            </div>
            <div>
                <label/>
                <button className='primary' type='submit'>Update</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileScreen;
