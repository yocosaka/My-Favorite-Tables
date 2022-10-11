import { useState } from 'react';
import { Marker, InfoWindowF } from '@react-google-maps/api';
import { v4 as uuid } from 'uuid';

type PlaceType = { name: string; pos: { lat: number; lng: number } };
type PlaceInfoPropTypes = {
  places: PlaceType[];
};

const PlaceInfo = ({ places }: PlaceInfoPropTypes) => {
  const [selected, setSelected] = useState<PlaceType | undefined>(undefined);

  // console.log(places);
  return (
    <>
      {places.map((place) => (
        <Marker
          key={uuid()}
          position={place.pos}
          onMouseOver={() => {
            setSelected(place);
          }}
        />
      ))}
      {selected ? (
        <InfoWindowF
          position={selected.pos}
          onCloseClick={() => {
            setSelected(undefined);
          }}
        >
          <div>{selected.name}</div>
        </InfoWindowF>
      ) : null}
    </>
  );
};

export default PlaceInfo;
