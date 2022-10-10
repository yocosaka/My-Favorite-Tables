import styles from './Card.module.scss';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import { SetStateAction, useRef } from 'react';
import { BoardNames } from '../../constants/variables';
import { ItemType } from '../../store/item/itemState';

export interface CardPropTypes extends ItemType {
  index: number;
  setItems: React.Dispatch<SetStateAction<ItemType[]>>;
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void;
}

const Card = ({
  id,
  name,
  category,
  area,
  setItems,
  index,
  moveCardHandler,
}: CardPropTypes) => {
  const ref = useRef<HTMLInputElement>(null);

  // Change Orders
  const [, drop] = useDrop({
    accept: 'CardType',
    hover(item: CardPropTypes, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY =
        clientOffset && clientOffset.y - hoverBoundingRect.top;
      if (
        dragIndex < hoverIndex &&
        hoverClientY &&
        hoverClientY < hoverMiddleY
      ) {
        return;
      }
      if (
        dragIndex > hoverIndex &&
        hoverClientY &&
        hoverClientY > hoverMiddleY
      ) {
        return;
      }
      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Change Board
  const changeItemBoard = (currentItem: ItemType, boardName: BoardNames) => {
    setItems((prevState: ItemType[]) => {
      return prevState.map((prevItem) => {
        return {
          ...prevItem,
          board: prevItem.id === currentItem.id ? boardName : prevItem.board,
        };
      });
    });
  };

  // Change Board with drag
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CardType',
    item: { id, index, name, category, area, setItems },
    end: (item: any, monitor: DragSourceMonitor) => {
      const dropResult: { dropEffect: string; name: string } | null =
        monitor.getDropResult();

      if (dropResult && dropResult.name) {
        const { name } = dropResult;
        let boardName: BoardNames;

        switch (name) {
          case BoardNames.FAVORITES:
            boardName = BoardNames.FAVORITES;
            break;
          case BoardNames.GO_TO:
            boardName = BoardNames.GO_TO;
            break;
          case BoardNames.NOT_FAVORITES:
            boardName = BoardNames.NOT_FAVORITES;
            break;
          case BoardNames.OKAY:
            boardName = BoardNames.OKAY;
            break;
          default:
            boardName = BoardNames.GO_TO;
            break;
        }
        changeItemBoard(item, boardName);
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
      {/* <div className={styles.id}>{id}</div> */}
      <h1>{name}</h1>
      <div className={styles.category}>{category}</div>
      <div className={styles.area}>{area}</div>
    </div>
  );
};
export default Card;
