import styles from './Home.module.scss';
import Board from '../../components/Board';
import Card from '../../components/Card';
import { useState } from 'react';
import { CardType } from '../../components/Card/Card';

const Home = () => {
  const [items, setItems] = useState<CardType[]>([
    {
      id: 1,
      name: 'Mos Burgur Kunitachi',
      category: 'Humburgur',
      board: 'favorites',
    },
    {
      id: 2,
      name: 'Koenji Thai kaan',
      category: 'Thaifood',
      board: 'favorites',
    },
    {
      id: 3,
      name: 'Burgur King Kunitachi',
      category: 'Humburgur',
      board: 'favorites',
    },
  ]);

  const returnItemsForBoard = (boardName: string) => {
    return items
      .filter((item) => item.board === boardName)
      .map((item) => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          category={item.category}
          setItems={setItems}
          board={item.board}
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
