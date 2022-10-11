// import styles from './Maps.module.scss';
import React, { useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import PlaceInfo from './PlaceInfo';
import mapStyle from './helpers/mapStyle';

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
    libraries: ['places'],
  });

  const [storeInfo, setStoreInfo] = useState<google.maps.places.PlaceResult>(
    {},
  );
  const [center, setCenter] = useState<google.maps.LatLng | undefined>(
    undefined,
  );

  const onMapLoad = (map: HTMLDivElement | google.maps.Map) => {
    const request = {
      // query: 'Burger King Kunitachi',
      query: 'Starbucks Tachikawa wakaba',
      // fields: ['name', 'geometry'],
      fields: [
        'business_status',
        'formatted_address',
        'geometry',
        'icon',
        'icon_mask_base_uri',
        'icon_background_color',
        'name',
        'photos',
        'place_id',
        'plus_code',
        'types',
        'opening_hours',
        'price_level',
        'rating',
        'user_ratings_total',
      ],
    };

    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const result = results[0];
        // console.log('result', result);
        setStoreInfo(result);

        if (result.geometry?.location) {
          const coordinates = new google.maps.LatLng({
            lat: result.geometry?.location?.lat() as number,
            lng: result.geometry?.location?.lng() as number,
          });
          setCenter(coordinates);
        }
      }
    });
  };

  const places = [storeInfo];

  return (
    <>
      {loadError && <div>Error</div>}
      {!isLoaded && <div>Loading...</div>}
      {!loadError && isLoaded && storeInfo && (
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
          options={options}
          onLoad={onMapLoad}
        >
          <PlaceInfo
            places={places.map((place) => ({
              name: place.name || '',
              pos: {
                lat: (place.geometry?.location?.lat() as number) || 0,
                lng: (place.geometry?.location?.lng() as number) || 0,
              },
            }))}
          />
        </GoogleMap>
      )}
    </>
  );
};
export default Maps;
