// import { useSelector } from 'react-redux';
// import PedalBikeIcon from '@mui/icons-material/PedalBike';
// import StarIcon from '@mui/icons-material/Star';
// import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MyTables from 'src/components/MyTables/MyTables';
import styles from './Home.module.scss';

const Home = () => {
  // const storeItems = useSelector(itemsSelector);

  return (
    <div className={styles.container}>
      <MyTables />
    </div>
  );
};
export default Home;
