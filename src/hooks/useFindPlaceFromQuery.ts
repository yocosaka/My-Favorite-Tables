import { useState } from 'react';

const useFindPlaceFromQuery = (searchQuery: string) => {
  const [storeInfo, setStoreInfo] = useState<google.maps.places.PlaceResult>({});
  const [latLng, setLatLng] = useState<google.maps.LatLng | undefined>(
    undefined,
  );

  const getStoreInfo = (map: HTMLDivElement | google.maps.Map) => {
    const request = {
      query: searchQuery,
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
          setLatLng(coordinates);
        }
      }
    });
  };
  return {
    storeInfo,
    latLng,
    getStoreInfo,
  };
};

export default useFindPlaceFromQuery;
