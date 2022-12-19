import GoogleIcon from '@mui/icons-material/Google';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import styles from './TableInfo.module.scss';

type PropTypes = {
  table: google.maps.places.PlaceResult;
};
const TableInfo = ({ table }: PropTypes) => {
  return (
    <div className={styles.textContainer}>
      {table && (
        <>
          <div className={styles.titleWrapper}>
            <img
              src={table.icon}
              alt={table.types ? table.types[0] : table.name}
            />
            <h2>{table.name}</h2>
          </div>
          {table.photos && (
            <div className={styles.imageContainer}>
              <img
                src={table.photos[0].getUrl()}
                alt={table.name}
                className={styles.mainImage}
              />
            </div>
          )}
          <div className={styles.address}>{table.formatted_address}</div>
          {/* <div>{table.formatted_phone_number}</div> */}
          {/* <div>Status:{table.business_status}</div> */}
          {/* <div>Price: {table.price_level}</div> */}
          <div className={styles.types}>
            {table.types?.map((type) => (
              <div className={styles.type}>{type}</div>
            ))}
          </div>
          {table.url && (
            <div className={styles.url}>
              <GoogleIcon />
              <a href={table.url} target="_blank">
                See on Google Map
              </a>
            </div>
          )}
          {table.website && (
            <div className={styles.website}>
              <WebAssetIcon />
              <a href={table.website} target="_blank">
                Website
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TableInfo;
