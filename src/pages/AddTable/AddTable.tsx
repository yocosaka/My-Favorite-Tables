/*global google*/
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api';
// import BasicModal from 'src/components/BasicModal';
import Button from 'src/components/Button';
import Page from 'src/components/Page';
import TableInfo from 'src/components/TableInfo';
import { ItemType } from 'src/constants/variables';
import { columnsSelector, updateColumns } from 'src/store/columns/columnsSlice';
import { ColumnsType } from 'src/store/columns/columnsState';
import { v4 as uuid } from 'uuid';
import styles from './AddTable.module.scss';
// import AddTableForm from '../../components/AddTableForm';

let markerArray = [];

type locationType = google.maps.LatLng;

const AddTable = () => {
  const dispatch = useDispatch();
  const columnsData = useSelector(columnsSelector);
  const [columns, setColumns] = useState<ColumnsType>(columnsData);
  const defaultCurrentLoc = new google.maps.LatLng(0, 0);
  const [currentLoc, setCurrentLoc] = useState<locationType>(defaultCurrentLoc);
  const [markers, setMarkers] = useState<(locationType | undefined)[]>([]);
  const [table, setTable] = useState<
    google.maps.places.PlaceResult | undefined
  >(undefined);
  const [bounds, setBounds] = useState<
    google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined
  >(undefined);
  const [searchBox, setSearchBox] = useState<
    google.maps.places.SearchBox | undefined
  >(undefined);
  const [error, setError] = useState<string>('');

  // Open Form
  // const [showForm, setShowForm] = useState<boolean>(false);

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

  const onAddBtnClick = (tableToAdd: google.maps.places.PlaceResult) => {
    console.log('AddBtnClicked!', table);
    // Check if the place is an restaurant, cafe
    if (
      !tableToAdd.types?.includes('cafe') &&
      !tableToAdd.types?.includes('restaurant') &&
      !tableToAdd.types?.includes('food')
    ) {
      setError(
        'Sorry, only Restaurant or cafe can be added to your table list.',
      );
      return;
    }
    // custmize item
    const newItem = {
      id: uuid(),
      name: tableToAdd.name,
      category: tableToAdd.types[0],
      area: 'Tokyo',
      needToBook: false,
      review: {
        atmosphere: 5,
        taste: 5,
        hospitality: 5,
        convenience: 3,
        cost_performance: 4,
      },
      scene: 'Casual',
      gmapInfo: {
        types: tableToAdd.types || [],
        icon: tableToAdd.icon || '',
        opening_hours: tableToAdd.opening_hours?.weekday_text || [],
        address: tableToAdd.formatted_address,
        main_photo: (tableToAdd.photos && tableToAdd.photos[0].getUrl()) || '',
        gmapUrl: tableToAdd.url || '',
        websiteUrl: tableToAdd.website || '',
        tel: tableToAdd.formatted_phone_number || '',
        price_level: tableToAdd.price_level || 3,
      },
      memo: 'Memo',
      favoriteMenus: [
        {
          title: 'Pasta 01',
          price: 1200,
        },
      ],
    } as unknown as ItemType;
    // update columns
    setColumns({
      ...columns,
      togo: {
        title: columns.togo.title,
        items: [newItem, ...columns.togo.items],
      },
    });
  };

  useEffect(() => {
    dispatch(updateColumns(columns));
  }, [columns, dispatch]);

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
            mapContainerStyle={{
              height: '400px',
              width: '100%',
            }}
          >
            {markers.map((mark) => {
              return (
                <Marker key={uuid()} position={mark as google.maps.LatLng} />
              );
            })}
          </GoogleMap>
        </div>

        {table && <TableInfo table={table} />}
      </div>

      {/* <BasicModal Component={AddTableForm} /> */}
      <Button onClick={() => table && onAddBtnClick(table)} size={'medium'}>
        Add this table to my list
      </Button>
      {error && <div>{error}</div>}
      {/* <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close form' : 'Add this table to my list'}
      </Button> */}
      {/* {showForm && <AddTableForm table={table} />} */}
    </Page>
  );
};

export default AddTable;
