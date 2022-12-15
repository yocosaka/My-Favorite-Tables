import { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { ItemType } from 'src/store/item/itemState';
import { v4 as uuid } from 'uuid';
import styles from './MyTables.module.scss';
import { boardsData } from '../../constants/sample';
import Card from '../Card/Card';

const MyTables = () => {
  const [columns, setColumns] = useState(boardsData);

  type ColumnsType = {
    [x: string]: {
      title: string;
      items: ItemType[];
    };
  };
  const onDragEnd = (
    result: DropResult,
    columns: ColumnsType,
    setColumns: React.Dispatch<React.SetStateAction<ColumnsType>>,
  ) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className={styles.container}>
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <Droppable key={uuid()} droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.board}
                >
                  <div className={styles.title}>{column.title}</div>
                  {column.items.map((item, index) => (
                    <Card key={uuid()} item={item} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default MyTables;
