import Login from "./Login";
import { useSelector } from "react-redux";
import Header from "./Header";

const Layout = () => {
  const isLoggedIn = useSelector((store) => store.user.currentUser);
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-base-100 w-full">
        <Login />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-100 w-full">
      <Header />
    </div>
  );
};

export default Layout;
