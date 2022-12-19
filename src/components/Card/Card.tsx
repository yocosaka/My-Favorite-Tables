import { Draggable } from 'react-beautiful-dnd';
import { TableType } from 'src/constants/variables';
import styles from './Card.module.scss';
import BasicModal from '../BasicModal';
import TableInfo from '../TableInfo';

type PropTypes = {
  item: TableType;
  index: number;
};

const Card = ({ item, index }: PropTypes) => {
  const MyTable = () => {
    return <TableInfo table={item} />;
  };

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
            <BasicModal
              ContentComponent={MyTable as React.FunctionComponent}
              btnText={'Show More'}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
