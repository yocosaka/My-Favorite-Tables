// import styles from './Maps.module.scss';
import React, { useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import PlaceInfo from './PlaceInfo';
import mapStyle from './helpers/mapStyle';

export type PlaceType = {
  info: string;
  location: { lat: number; lng: number };
};

const places = [
  {
    info: 'Burger King Kunitachi',
    location: { lat: 35.69808614232754, lng: 139.44707002452878 },
  },
  {
    info: 'Mos Burger',
    location: { lat: 35.69697959381257, lng: 139.44719877054865 },
  },
];

const libraries: (
  | 'places'
  | 'geometry'
  | 'drawing'
  | 'localContext'
  | 'visualization'
)[] = ['places'];

const containerStyle = {
  height: '60vh',
  width: '100%',
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const Maps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GMAP_KEY || '',
    libraries,
  });
  const mapRef = useRef();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMapLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const center = {
    lat: 35.6992710906405,
    lng: 139.44613661588468,
  };

  return (
    <>
      {loadError && <div>Error</div>}
      {!isLoaded && <div>Loading..</div>}
      {!loadError && isLoaded && (
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
          options={options}
          onLoad={onMapLoad}
        >
          <PlaceInfo places={places} />
        </GoogleMap>
      )}
    </>
  );
};
export default Maps;
