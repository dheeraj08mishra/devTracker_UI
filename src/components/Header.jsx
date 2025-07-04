import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { logoutCurrentUser } from "../utils/redux/userProfileSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const IsLoggedIn = useSelector((store) => store.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      if (IsLoggedIn) {
        const response = await fetch(BASE_URL + "/logout", {
          method: "POST",
          credentials: "include",
        });
        if (!response.ok) {
          toast.error("Failed to log out. Please try again.", {
            removeDelay: 3000,
            id: "logoutError",
          });
          return;
        }
        const data = await response.json();
        toast.success(data.message, {
          removeDelay: 3000,
          id: "logoutSuccess",
        });
        navigate("/");
        dispatch(logoutCurrentUser());
      }
    } catch (err) {
      toast.error(err, {
        removeDelay: 3000,
        id: "logoutError",
      });
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-2 sm:px-4">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-lg sm:text-2xl hover:underline px-1 sm:px-4 min-h-0"
        >
          <h1 className="text-3xl font-extrabold">Dev Tracker</h1>
        </Link>
        <span className="hidden sm:inline text-sm text-muted-foreground mt-1 sm:mt-0">
          Clear insights into your development
        </span>
      </div>

      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar hover:scale-110 transition-transform duration-200 ease-in-out min-h-0"
        >
          <div className="w-10 rounded-full ring">
            <img
              alt="User avatar"
              src={
                IsLoggedIn?.photo ||
                "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
              }
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 mt-3 z-[1] p-2 shadow rounded-box w-40 sm:w-52"
        >
          <li>
            <Link to="/" className="py-2">
              🏠 Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile" className="py-2">
              👤 Profile
            </Link>
          </li>
          <li>
            <Link to="/projects" className="py-2">
              📂 Projects
            </Link>
          </li>
          <li>
            <button
              onClick={logoutUser}
              className="text-error w-full py-2 hover:bg-error/10"
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
