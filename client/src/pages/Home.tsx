import { Link } from "react-router";
import "./Home.css";

export default function Home() {
  return (
    <header className='home-header'>
      <title>NeoMall</title>
      <div className='home-name-presentation'>
        <h1 className='home-title'>Welcome to NeoMall</h1>
      </div>
      <div>
        <button>
          <Link to='login'>Login</Link>
        </button>
        <button className='home-nav-btn'>
          <Link to='/products' className='home-link'>
            Enter
          </Link>
        </button>
      </div>
    </header>
  );
}
