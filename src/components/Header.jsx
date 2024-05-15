import './Header.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function Header({ linkName, link }) {
  return (
    <div>
      <div className="header">
        <Link to={link} className="headerBtn">
          {linkName}
        </Link>
      </div>
    </div>
  );
}

export default Header;
