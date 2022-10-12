/*global google*/
import React, { useState } from 'react';
import { GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api';
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
      {store && (
        <div>
          <h2>{store.name}</h2>
          <div>{store.adr_address}</div>
        </div>
      )}
      <div style={{ marginTop: '80px' }}>
        <GoogleMap
          center={markers[0] || currentLoc}
          zoom={15}
          onLoad={(map: google.maps.Map) => onMapLoad(map)}
          mapContainerStyle={{ height: '400px', width: '800px' }}
        >
          {markers.map((mark, index) => {
            return <Marker key={index} position={mark as google.maps.LatLng} />;
          })}
        </GoogleMap>
      </div>
    </div>
  );
};

export default AddStore;
