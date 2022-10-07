import styles from './Card.module.scss';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import { SetStateAction, useRef } from 'react';

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
  index: number;
  setItems: React.Dispatch<SetStateAction<CardType[]>>;
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void;
}

const Card = ({
  id,
  name,
  category,
  setItems,
  index,
  moveCardHandler,
}: CardPropTypes) => {
  const ref = useRef<HTMLInputElement>(null);
  const [, drop] = useDrop({
    accept: 'CardType',
    hover(item: CardPropTypes, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY =
        clientOffset && clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (
        dragIndex < hoverIndex &&
        hoverClientY &&
        hoverClientY < hoverMiddleY
      ) {
        return;
      }
      // Dragging upwards
      if (
        dragIndex > hoverIndex &&
        hoverClientY &&
        hoverClientY > hoverMiddleY
      ) {
        return;
      }
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

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
    item: { id, index, name, category, setItems },
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
  drag(drop(ref));
  return (
    <div className={styles.card} ref={ref} style={{ opacity }}>
      <div className={styles.id}>{id}</div>
      <h1>{name}</h1>
      <div className={styles.category}>{category}</div>
    </div>
  );
};
export default Card;
