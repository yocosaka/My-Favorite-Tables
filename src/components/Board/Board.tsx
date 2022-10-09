import clsx from 'clsx';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import styles from './Board.module.scss';

type PropTypes = {
  name: string;
  title: string;
  children: React.ReactNode;
};

const Board = ({ name, title, children }: PropTypes) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'CardType',
    drop: () => ({ name: name }),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // console.log('options', isOver, canDrop);
  return (
    <div className={clsx(styles.boardContainer, styles[name])} ref={drop}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
};

export default Board;
