import styles from './Card.module.scss';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { SetStateAction } from 'react';

export interface CardType {
  id: number;
  name: string;
  category: string;
  board: string;
}

export interface CardPropTypes {
  id: number;
  name: string;
  category: string;
  board: string;
  setItems: React.Dispatch<SetStateAction<CardType[]>>;
}

const Card = ({ id, name, category, setItems }: CardPropTypes) => {
  const changeItemBoard = (currentItem: CardType, boardName: any) => {
    setItems((prevState: CardType[]) => {
      return prevState.map((prevItem) => {
        return {
          ...prevItem,
          board: prevItem.id === currentItem.id ? boardName : prevItem.board,
        };
      });
    });
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CardType',
    item: { id, name, category, setItems },
    end: (item: any, monitor: DragSourceMonitor) => {
      const dropResult: { dropEffect: string; name: string } | null =
        monitor.getDropResult();
      if (dropResult && dropResult.name === 'Favorites') {
        changeItemBoard(item, 'favorites');
      } else {
        changeItemBoard(item, 'goto');
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div className={styles.card} ref={drag} style={{ opacity }}>
      <div className={styles.id}>{id}</div>
      <h1>{name}</h1>
      <div className={styles.category}>{category}</div>
    </div>
  );
};
export default Card;
