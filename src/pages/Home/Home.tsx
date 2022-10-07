import styles from './Home.module.scss';
import Board from '../../components/Board';
import Card from '../../components/Card';
import { useState } from 'react';
import { CardType } from '../../components/Card/Card';
import { sampleItems } from '../../constants/sample';

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
      <Board title="Favorites">{returnItemsForBoard('favorites')}</Board>
      <Board title="Goto">{returnItemsForBoard('goto')}</Board>
    </div>
  );
};
export default Home;
