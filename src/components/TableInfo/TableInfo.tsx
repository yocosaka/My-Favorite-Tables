import GoogleIcon from '@mui/icons-material/Google';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import { TableType } from 'src/constants/variables';
import { v4 as uuid } from 'uuid';
import styles from './TableInfo.module.scss';

type PropTypes = {
  table: TableType;
};
const TableInfo = ({ table }: PropTypes) => {
  return (
    <>
      <div className={styles.titleWrapper}>
        {table.gmapInfo.icon && (
          <img
            src={table.gmapInfo.icon}
            alt={table.gmapInfo.types ? table.gmapInfo.types[0] : table.name}
          />
        )}
        <h2>{table.name}</h2>
      </div>
      {table.gmapInfo.main_photo && (
        <div className={styles.imageContainer}>
          <img
            src={table.gmapInfo.main_photo}
            alt={table.name}
            className={styles.mainImage}
          />
        </div>
      )}
      <div className={styles.address}>{table.gmapInfo.address}</div>
      {/* <div>{table.formatted_phone_number}</div> */}
      {/* <div>Status:{table.business_status}</div> */}
      {/* <div>Price: {table.price_level}</div> */}
      <div className={styles.types}>
        {table.gmapInfo.types?.map((type) => (
          <div className={styles.type} key={uuid()}>
            {type}
          </div>
        ))}
      </div>
      {table.gmapInfo.gmapUrl && (
        <div className={styles.url}>
          <GoogleIcon />
          <a href={table.gmapInfo.gmapUrl} target="_blank">
            See on Google Map
          </a>
        </div>
      )}
      {table.gmapInfo.websiteUrl && (
        <div className={styles.website}>
          <WebAssetIcon />
          <a href={table.gmapInfo.websiteUrl} target="_blank">
            Website
          </a>
        </div>
      )}
    </>
  );
};

export default TableInfo;
