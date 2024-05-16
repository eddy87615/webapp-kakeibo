import './Header.css';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Header({ linkName, link }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    // 添加短暂延迟，以确保动画效果显示
    setTimeout(() => {
      navigate(link);
    }, 300); // 延迟时间与动画时间一致
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
