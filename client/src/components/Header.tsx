import { Link } from "react-router";
import "./Header.css";
import { useLocation } from "react-router";
import useAuth from "../hooks/useAuth.tsx";

export default function Header() {
  const path = useLocation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className='header-header'>
      <div className='header-neomall'>
        <nav>
          {path.pathname === "/" ? (
            ""
          ) : (
            <>
              <div className='header-neomall-link'>
                <img src='/icon.svg' />
                <Link to='/'>NeoMall</Link>
              </div>
            </>
          )}
        </nav>
      </div>
      <div className='header-nav-section'>
        {path.pathname === "/products" ? (
          isAuthenticated === false ? (
            <Link to='/login'>Login</Link>
          ) : (
            <>
              <Link to='/profile'>Profile</Link>
              <button onClick={logout}>Logout</button>
              <Link to='/cart'>Cart</Link>
            </>
          )
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
