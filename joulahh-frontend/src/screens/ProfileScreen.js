import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsUser } from "../store/actions/userActions";

const ProfileScreen = () => {
    console.log('ProfileScreen.js rendering');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  const  { userInfo } = useSelector((state) => state.userSigninReducer);

  const { loading, error, user } = useSelector((state) => state.userDetails);
//   console.log('user from userDetailsState',user)

  const submitHandler = (e) => {
    e.preventDefautl();
    //dispatch update profile actions
}

  const dispatch = useDispatch();
  useEffect(() => {
      console.log('USEEFFECT');
    if(!user){
        console.log('oomad tu !user')
        dispatch(detailsUser(userInfo._id));
    } else{
        console.log('umad tu else')
        setName(user.name)
    }
  }, [dispatch, userInfo._id, user]);     //age inja user ro nazarim dependency, com render mishe miad tu useEffect > if(!user) > dobare render 
 
  
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
