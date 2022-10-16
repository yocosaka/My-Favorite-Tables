/*global google*/
import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import { GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api';
// import BasicModal from 'src/components/BasicModal';
import Button from 'src/components/Button';
import Page from 'src/components/Page';
import { v4 as uuid } from 'uuid';
import styles from './AddTable.module.scss';
import AddTableForm from '../../components/AddTableForm';

let markerArray = [];

type locationType = google.maps.LatLng;

const AddTable = () => {
  const defaultCurrentLoc = new google.maps.LatLng(0, 0);
  const [currentLoc, setCurrentLoc] = useState<locationType>(defaultCurrentLoc);
  const [markers, setMarkers] = useState<(locationType | undefined)[]>([]);
  const [table, setTable] = useState<google.maps.places.PlaceResult | undefined>(
    undefined,
  );
  const [bounds, setBounds] = useState<
    google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined
  >(undefined);
  const [searchBox, setSearchBox] = useState<
    google.maps.places.SearchBox | undefined
  >(undefined);

  // Open Form
  const [showForm, setShowForm] = useState<boolean>(false);

  const onMapLoad = (map: google.maps.Map) => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const newLoc = new google.maps.LatLng(lat, lng);
        setCurrentLoc(newLoc);
      },
    );
    google.maps.event.addListener(map, 'bounds_changed', () => {
      console.log('map.getBounds()', map.getBounds());
      setBounds(map.getBounds());
    });
  };

  const onSBLoad = (searchBox: google.maps.places.SearchBox) => {
    setSearchBox(searchBox);
  };

  const onPlacesChanged = () => {
    markerArray = [];
    const results = searchBox?.getPlaces();
    if (results) {
      console.log('results[0]', results[0]);
      const place = results[0]?.geometry?.location;
      markerArray.push(place);
      setTable(results[0]);
      console.log(table);
      console.log(table && table.photos && table?.photos[0].html_attributions);
    }
    setMarkers(markerArray);
    console.log('markerArray', markerArray);
  };

  return (
    <Page>
      <div id="searchbox">
        <StandaloneSearchBox
          onLoad={onSBLoad}
          onPlacesChanged={onPlacesChanged}
          bounds={bounds}
        >
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              placeholder="Search table to add by keyword"
              className={styles.input}
            />
          </div>
        </StandaloneSearchBox>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.mapContainer}>
          <GoogleMap
            center={markers[0] || currentLoc}
            zoom={15}
            onLoad={(map: google.maps.Map) => onMapLoad(map)}
            mapContainerStyle={{ height: '50vh', width: '100%' }}
          >
            {markers.map((mark) => {
              return (
                <Marker key={uuid()} position={mark as google.maps.LatLng} />
              );
            })}
          </GoogleMap>
        </div>

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
                    src={table.photos[0].getUrl({
                      maxWidth: 500,
                      maxHeight: 500,
                    })}
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
      </div>

      {/* <BasicModal Component={AddTableForm} /> */}
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close form' : 'Add this table to my list'}
      </Button>
      {showForm && <AddTableForm table={table} />}
    </Page>
  );
};

export default AddTable;
