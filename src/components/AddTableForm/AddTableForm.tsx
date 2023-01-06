import { TableType } from 'src/constants/variables';
import styles from './AddTableForm.module.scss';
import Button from '../Button';
import ReviewForm from '../ReviewForm';

type PropTypes = {
  table: TableType;
  onAddBtnClick: (customTable: TableType) => void;
};

const AddTableForm = ({ table, onAddBtnClick }: PropTypes) => {
  return (
    <>
      <div className={styles.wrapper}>
        <h2>Review for {table.name}</h2>
        <ReviewForm table={table} />
      </div>
      <Button onClick={() => onAddBtnClick(table)} size={'medium'}>
        Add this table to my list
      </Button>
    </>
  );
};
export default AddTableForm;
