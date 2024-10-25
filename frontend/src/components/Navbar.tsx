import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <nav>
      <div>
        <div>
          <Link to="/">Home</Link>
        </div>
        {isLoggedIn() ? (
          <div>
            <div>Welcome, {user?.userName}</div>
            <a onClick={logout}>Logout</a>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
