/*global google*/
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import BasicModal from 'src/components/BasicModal';
import Button from 'src/components/Button';
import Page from 'src/components/Page';
import TableInfo from 'src/components/TableInfo';
import { TableType } from 'src/constants/variables';
import { columnsSelector, updateColumns } from 'src/store/columns/columnsSlice';
import { ColumnsType } from 'src/store/columns/columnsState';
import { v4 as uuid } from 'uuid';
import styles from './AddTable.module.scss';
import AddTableForm from '../../components/AddTableForm';

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
  const [customTable, setCustomTable] = useState<TableType | undefined>(
    undefined,
  );
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

  const onAddBtnClick = (customTable: TableType) => {
    console.log('AddBtnClicked!', table);
    // Check if the place is an restaurant, cafe
    if (
      !customTable.gmapInfo.types?.includes('cafe') &&
      !customTable.gmapInfo.types?.includes('restaurant') &&
      !customTable.gmapInfo.types?.includes('food')
    ) {
      setError(
        'Sorry, only Restaurant or cafe can be added to your table list.',
      );
      return;
    }

    // update columns
    setColumns({
      ...columns,
      togo: {
        title: columns.togo.title,
        items: [customTable, ...columns.togo.items],
      },
    });
  };

  useEffect(() => {
    if (!table) {
      return;
    }
    // generate newTable
    const newTable = {
      id: uuid(),
      name: table.name,
      category: table.types ? table.types[0] : 'food',
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
        types: table.types || [],
        icon: table.icon || '',
        opening_hours: table.opening_hours?.weekday_text || [],
        address: table.formatted_address,
        main_photo: (table.photos && table.photos[0].getUrl()) || '',
        gmapUrl: table.url || '',
        websiteUrl: table.website || '',
        tel: table.formatted_phone_number || '',
        price_level: table.price_level || 3,
      },
      memo: 'Memo',
      favoriteMenus: [
        {
          title: 'Pasta 01',
          price: 1200,
        },
      ],
    } as unknown as TableType;

    setCustomTable(newTable);
  }, [table]);

  useEffect(() => {
    dispatch(updateColumns(columns));
  }, [columns, dispatch]);

  const CustomAddTableForm = () => {
    return <AddTableForm table={customTable} />;
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

        {customTable && (
          <div className={styles.textContainer}>
            <TableInfo table={customTable} />
          </div>
        )}
      </div>

      {table && (
        <>
          <Button
            onClick={() => customTable && onAddBtnClick(customTable)}
            size={'medium'}
          >
            Add this table to my list anyway
          </Button>

          <BasicModal
            ContentComponent={CustomAddTableForm}
            btnText={'Add this table with my comment'}
          />
        </>
      )}
      {error && <div>{error}</div>}
    </Page>
  );
};

export default AddTable;
