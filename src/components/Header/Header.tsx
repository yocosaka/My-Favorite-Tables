import styles from './Header.module.scss';
import AbcIcon from '@mui/icons-material/Abc';

const Header = () => {
  return (
    <header className={styles.header}>
      <AbcIcon />
      <h1>Favorite Tables</h1>
    </header>
  );
};

export default Header;
