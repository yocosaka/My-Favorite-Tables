import { useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';

const containerStyle = {
  height: '80vh',
  width: '100%',
};

const markers = [
  {
    id: 1,
    name: 'Burger King Kunitachi',
    position: { lat: 35.69852180694143, lng: 139.44730606135982 },
  },
  {
    id: 2,
    name: 'Les Entremets de Kunitachi',
    position: { lat: 35.691065636491665, lng: 139.44720706161348 },
  },
  // {
  //   id: 3,
  //   name: 'acqua cotta',
  //   position: { lat: 35.88071206676472, lng: 139.62904951533997 },
  // },
  {
    id: 4,
    name: 'Patisserie Ichirin KunitachiPatisserie Ichirin Kunitachi',
    position: { lat: 35.71175834721385, lng: 139.43337130796024 },
  },
  // {
  //   id: 5,
  //   name: 'Baan-Esan',
  //   position: { lat: 35.70554044971139, lng: 139.6490771233002 },
  // },
];

const Maps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GMAP_KEY || '',
  });

  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map: {
    fitBounds: (arg0: google.maps.LatLngBounds) => void;
  }) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <>
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
        >
          {markers.map(({ id, name, position }) => (
            <MarkerF
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
            >
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{name}</div>
                </InfoWindow>
              ) : null}
            </MarkerF>
          ))}
        </GoogleMap>
      )}
    </>
  );
};
export default Maps;
