import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { PlaceType } from '../Maps';

type PlaceInfoPropTypes = {
  places: PlaceType[];
};

const PlaceInfo = ({ places }: PlaceInfoPropTypes) => {
  const [selected, setSelected] = useState<{
    info: string;
    location: { lat: number; lng: number };
  } | null>(null);

  return (
    <>
      {places.map((marker) => (
        <Marker
          key={`${marker.location.lat * marker.location.lng}`}
          position={{
            lat: marker.location.lat,
            lng: marker.location.lng,
          }}
          onMouseOver={() => {
            setSelected(marker);
          }}
          icon={{
            url: 'url of icon',
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{
            lat: selected.location.lat,
            lng: selected.location.lng,
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>{selected.info}</div>
        </InfoWindow>
      ) : null}
    </>
  );
};

export default PlaceInfo;
