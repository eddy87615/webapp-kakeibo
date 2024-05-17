import './Header.css';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Header({ linkName, link }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    // delay
    setTimeout(() => {
      navigate(link);
    }, 300); // set
  };

  return (
    <div>
      <div className="header">
        <Link to={link} className="headerBtn" onClick={handleClick}>
          {linkName}
        </Link>
      </div>
    </div>
  );
}

export default Header;
