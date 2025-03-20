import { Link } from 'react-router-dom';
import './index.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/add-blend">Add Blend</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
