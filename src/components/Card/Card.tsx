import { Draggable } from 'react-beautiful-dnd';
import styles from './Card.module.scss';
import { ItemType } from '../../store/item/itemState';

type PropTypes = {
  item: ItemType;
  index: number;
};

const Card = ({ item, index }: PropTypes) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.card}
        >
          <div className={styles.content}>
            <h1 className={styles.name}>{item.name}</h1>
            <div className={styles.category}>{item.category}</div>
            <div className={styles.area}>{item.area}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
