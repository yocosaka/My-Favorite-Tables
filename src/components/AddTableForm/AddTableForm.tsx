// import styles from './AddTableForm.module.scss';

import { useDispatch } from 'react-redux';

type PropTypes = {
  table: google.maps.places.PlaceResult | undefined;
};

const AddTableForm = ({ table }: PropTypes) => {
  console.log('Table from From', table);
  return <div>AddTableForm</div>;
};

export default AddTableForm;
