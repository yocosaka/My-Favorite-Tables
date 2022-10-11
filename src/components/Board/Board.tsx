import { DropTargetMonitor, useDrop } from 'react-dnd';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import styles from './Board.module.scss';

type PropTypes = {
  name: string;
  title: string;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

const Board = ({ name, title, children, Icon }: PropTypes) => {
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
      <h2 className={styles.title}>
        {Icon && <Icon sx={{ fontSize: 30, marginRight: 0.5 }} />}
        {title}
      </h2>
      {children}
    </div>
  );
};

export default Board;
