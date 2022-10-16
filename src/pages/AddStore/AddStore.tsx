/*global google*/
import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import { GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import { v4 as uuid } from 'uuid';
import styles from './AddStore.module.scss';

let markerArray = [];

type locationType = google.maps.LatLng;

const AddStore = () => {
  const defaultCurrentLoc = new google.maps.LatLng(0, 0);
  const [currentLoc, setCurrentLoc] = useState<locationType>(defaultCurrentLoc);
  const [markers, setMarkers] = useState<(locationType | undefined)[]>([]);
  const [store, setStore] = useState<
    google.maps.places.PlaceResult | undefined
  >(undefined);
  const [bounds, setBounds] = useState<
    google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined
  >(undefined);
  const [searchBox, setSearchBox] = useState<
    google.maps.places.SearchBox | undefined
  >(undefined);

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
      setStore(results[0]);
      console.log(store);
      console.log(store && store.photos && store?.photos[0].html_attributions);
    }
    setMarkers(markerArray);
    console.log('markerArray', markerArray);
  };

  return (
    <div>
      <div id="searchbox">
        <StandaloneSearchBox
          onLoad={onSBLoad}
          onPlacesChanged={onPlacesChanged}
          bounds={bounds}
        >
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              placeholder="Search store to add by keyword"
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
          {store && (
            <>
              <div className={styles.titleWrapper}>
                <img
                  src={store.icon}
                  alt={store.types ? store.types[0] : store.name}
                />
                <h2>{store.name}</h2>
              </div>
              {store.photos && (
                <img
                  src={store.photos[0].getUrl({
                    maxWidth: 500,
                    maxHeight: 500,
                  })}
                  alt={store.name}
                  className={styles.storeImage}
                />
              )}
              <div className={styles.address}>{store.formatted_address}</div>
              {/* <div>{store.formatted_phone_number}</div> */}
              {/* <div>Status:{store.business_status}</div> */}
              {/* <div>Price: {store.price_level}</div> */}
              <div className={styles.types}>
                {store.types?.map((type) => (
                  <div className={styles.type}>{type}</div>
                ))}
              </div>
              {store.url && (
                <div className={styles.url}>
                  <GoogleIcon />
                  <a href={store.url}>Google URL</a>
                </div>
              )}
              {store.website && (
                <div className={styles.website}>
                  <WebAssetIcon />
                  <a href={store.website}>Website</a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStore;
