import styles from './Home.module.scss';
import Board from '../../components/Board';
import Card from '../../components/Card';
import { useState } from 'react';
import { CardType } from '../../components/Card/Card';
import { sampleItems } from '../../constants/sample';
import { BoardNames } from '../../constants/variables';

const Home = () => {
  const [items, setItems] = useState<CardType[]>(sampleItems);

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const copiedStateArray = [...prevState];
        // remove item by hoverIndex and put dragItem
        const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
        // remove item by dragIndex and put prevItem
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
          setItems={setItems}
          board={item.board}
          index={index}
          moveCardHandler={moveCardHandler}
        ></Card>
      ));
  };

  return (
    <div className={styles.container}>
      <Board title={BoardNames.GO_TO}>
        {returnItemsForBoard(BoardNames.GO_TO)}
      </Board>
      <Board title={BoardNames.FAVORITES}>
        {returnItemsForBoard(BoardNames.FAVORITES)}
      </Board>
      <Board title={BoardNames.NOT_FAVORITES}>
        {returnItemsForBoard(BoardNames.NOT_FAVORITES)}
      </Board>
      <Board title={BoardNames.OKAY}>
        {returnItemsForBoard(BoardNames.OKAY)}
      </Board>
    </div>
  );
};
export default Home;
