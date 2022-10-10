import styles from './Header.module.scss';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.titleWrapper}>
        <RestaurantMenuIcon sx={{ fontSize: 24 }} />
        <h1 className={styles.title}>My Favorite Tables</h1>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={pathname === '/' ? styles.current : ''}>
            <Link to="/">List</Link>
          </li>
          <li className={pathname === '/places' ? styles.current : ''}>
            <Link to="/places">Places</Link>
          </li>
          <li className={pathname === '/categories' ? styles.current : ''}>
            <Link to="/categories">Categories</Link>
          </li>
          <li className={pathname === '/scenes' ? styles.current : ''}>
            <Link to="/scenes">Scenes</Link>
          </li>
          <li className={pathname === '/maps' ? styles.current : ''}>
            <Link to="/maps">Maps</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
