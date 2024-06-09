import './HeaderBtn.css';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function HeaderBtn({ linkName, link, id, onClick }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    setTimeout(() => {
      navigate(link);
    }, 300);
  };

  const clickHandler = onClick || handleClick;

  return (
    <div>
      <div className="header">
        {link ? (
          <Link to={link} className="headerBtn" onClick={handleClick} id={id}>
            {linkName}
          </Link>
        ) : (
          <button
            className="headerBtn deleteMode"
            onClick={clickHandler}
            id={id}
          >
            {linkName}
          </button>
        )}
      </div>
    </div>
  );
}

export default HeaderBtn;
