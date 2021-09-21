import { useSelector } from "react-redux";

const Sidebar = () => {

  const [userDropDown, setUserDropDown] = useState(false);
  const [adminDropDown, setAdminDropDown] = useState(false);
  const { userInfo } = useSelector((state) => state.userSigninReducer);

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch({ type: actions.SIGNOUT }); //?? ajiibe chera borde boodam ino too userActions ba dispatch amal nakard?
  }; // fek konam chon oonja ba dispatch mineveshtam . return dispatch => ... . dar hali ke oon male karaye async'e.

  const adminDropDownHandler = () => {
    setUserDropDown(false);
    setAdminDropDown(!adminDropDown);
  };
  return (
    <>
      {userInfo ? (
        <ul>
          <li>
            تنظیمات کاربر<i className="fa fa-caret-down arrow"></i>
          </li>
          {userDropDown && (
            <div className="userDropdown">
              <li>
                <Link to="/profile">پروفایل</Link>
              </li>
              <li>
                <Link to="/orderhistory">تاریخچه سفارشات</Link>
              </li>
              <li>
                <Link to="#" onClick={signoutHandler}>
                  خروج از حساب کاربری
                </Link>
              </li>
            </div>
          )}
        </ul>
      ) : (
        <div>
          <Link to="/signin">
            <p>ورود/ ثبت‌نام</p>
          </Link>
        </div>
      )}
      {userInfo && userInfo.isAdmin &&(
          <ul>
              <li onClick={adminDropDownHandler}></li>
          </ul>
      )}
    </>
  );
};

export default Sidebar;
