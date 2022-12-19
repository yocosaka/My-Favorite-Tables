// import styles from './AddTableForm.module.scss';

import { ItemType } from 'src/constants/variables';

type PropTypes = {
  table: ItemType;
};

const MyTablee = ({ table }: PropTypes) => {
  console.log('Table from From', table);
  return <div>{table.name}</div>;
};

export default MyTablee;
