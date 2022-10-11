import { useState } from 'react';
import { useSelector } from 'react-redux';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import StarIcon from '@mui/icons-material/Star';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import BasicModal from 'src/components/BasicModal';
import styles from './Home.module.scss';
import AddItemForm from '../../components/AddItemForm/AddItemForm';
import Board from '../../components/Board';
import Card from '../../components/Card';
import { BoardNames, BoardTitles } from '../../constants/variables';
import { itemsSelector } from '../../store/item/itemSlice';
import { ItemType } from '../../store/item/itemState';

const Home = () => {
  const storeItems = useSelector(itemsSelector);
  const [items, setItems] = useState<ItemType[]>(storeItems);

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const copiedStateArray = [...prevState];
        const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
        copiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return copiedStateArray;
      });
    }
  };

  const returnItemsForBoard = (boardName: string) => {
    return items
      .filter((item) => item.board === boardName)
      .map((item, index) => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          category={item.category}
          area={item.area}
          setItems={setItems}
          board={item.board}
          index={index}
          moveCardHandler={moveCardHandler}
        ></Card>
      ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.boardContainer}>
        <Board
          name={BoardNames.GO_TO}
          title={BoardTitles.GO_TO}
          Icon={PedalBikeIcon}
        >
          {returnItemsForBoard(BoardNames.GO_TO)}
        </Board>
        <Board
          name={BoardNames.FAVORITES}
          title={BoardTitles.FAVORITES}
          Icon={StarIcon}
        >
          {returnItemsForBoard(BoardNames.FAVORITES)}
        </Board>
        <Board
          name={BoardNames.OKAY}
          title={BoardTitles.OKAY}
          Icon={ThumbUpAltIcon}
        >
          {returnItemsForBoard(BoardNames.OKAY)}
        </Board>
        <Board
          name={BoardNames.NOT_FAVORITES}
          title={BoardTitles.NOT_FAVORITES}
          Icon={ThumbDownAltIcon}
        >
          {returnItemsForBoard(BoardNames.NOT_FAVORITES)}
        </Board>
      </div>
      <BasicModal Component={AddItemForm} />
    </div>
  );
};
export default Home;
