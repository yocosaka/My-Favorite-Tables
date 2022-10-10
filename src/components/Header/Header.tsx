import styles from './Header.module.scss';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const Header = () => {
  return (
    <header className={styles.header}>
      <RestaurantMenuIcon sx={{ fontSize: 24 }} />
      <h1 className={styles.title}>My Favorite Tables</h1>
    </header>
  );
};

export default Header;
