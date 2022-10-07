import { DropTargetMonitor, useDrop } from 'react-dnd';
import styles from './Board.module.scss';

type PropTypes = {
  title: string;
  children: React.ReactNode;
};

const Board = ({ title, children }: PropTypes) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'CardType',
    drop: () => ({ name: title }),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  console.log('options', isOver, canDrop);
  return (
    <div className={styles.boardContainer} ref={drop}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Board;
