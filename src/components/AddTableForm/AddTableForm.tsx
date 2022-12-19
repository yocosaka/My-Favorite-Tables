import { TableType } from 'src/constants/variables';

type PropTypes = {
  table?: TableType;
};

const AddTableForm = ({ table }: PropTypes) => {
  return (
    <div>
      <h2>AddTableForm</h2>
      <div>{table?.name}</div>
    </div>
  );
};
export default AddTableForm;
