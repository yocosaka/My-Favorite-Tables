import { useState } from 'react';
import {
  FormControlLabel,
  Rating,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { TableType } from 'src/constants/variables';
import styles from './ReviewForm.module.scss';

type PropTypes = {
  table: TableType | undefined;
};

const ReviewForm = ({ table }: PropTypes) => {
  const [atmosphere, setAtmosphere] = useState<number | null>(null);
  const [taste, setTaste] = useState<number | null>(null);
  const [hospitality, setHospitality] = useState<number | null>(null);
  const [location, setLocation] = useState<number | null>(null);
  const [costPerformance, setCostPerformance] = useState<number | null>(null);
  const [reservation, setReservation] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [scenes, setScenes] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const onCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };
  const onAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArea(event.target.value);
  };
  const onScenesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScenes(event.target.value);
  };
  const onCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <div className={styles.fields}>
      <div className={styles.rating}>
        {/* Atmosphere */}
        <div className={styles.field}>
          <Typography component="legend">Atmosphere</Typography>
          <Rating
            value={atmosphere}
            // max={10}
            size="large"
            onChange={(e, newValue) => setAtmosphere(newValue)}
          />
        </div>
        {/* Taste */}
        <div className={styles.field}>
          <Typography component="legend">Taste</Typography>
          <Rating
            value={taste}
            // max={10}
            size="large"
            onChange={(e, newValue) => setTaste(newValue)}
          />
        </div>
        {/* Hospitality*/}
        <div className={styles.field}>
          <Typography component="legend">Hospitality</Typography>
          <Rating
            value={hospitality}
            // max={10}
            size="large"
            onChange={(e, newValue) => setHospitality(newValue)}
          />
        </div>
        {/* Location*/}
        <div className={styles.field}>
          <Typography component="legend">Location</Typography>
          <Rating
            value={location}
            // max={10}
            size="large"
            onChange={(e, newValue) => setLocation(newValue)}
          />
        </div>
        {/*CostPerformance*/}
        <div className={styles.field}>
          <Typography component="legend">Cost Performance</Typography>
          <Rating
            value={costPerformance}
            // max={10}
            size="large"
            onChange={(e, newValue) => setCostPerformance(newValue)}
          />
        </div>
      </div>

      {/* Comment */}
      <div className={styles.field}>
        <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          fullWidth
          rows={4}
          value={comment}
          onChange={onCommentChange}
        />
      </div>

      {/* Category */}
      <div className={styles.field}>
        <TextField
          value={category}
          label="Category"
          variant="outlined"
          helperText="Please enter category name eg. Thaifood, Cafe, Sweets..."
          onChange={onCategoryChange}
        />
      </div>
      {/* Area */}
      <div className={styles.field}>
        <TextField
          value={area}
          label="Area"
          variant="outlined"
          helperText="Please enter area eg. Kunitachi, Kichijyoji..."
          onChange={onAreaChange}
        />
      </div>

      {/* Scenes */}
      <div className={styles.field}>
        <TextField
          fullWidth
          value={scenes}
          label="Scenes"
          variant="outlined"
          helperText="Please enter scene to visit eg. Daily, Party..."
          onChange={onScenesChange}
        />
      </div>
      {/* betterToReserve? */}
      <FormControlLabel
        control={
          <Switch
            checked={reservation}
            onChange={(e) => setReservation(e.target.checked)}
            name="reservation"
          />
        }
        label="Better to Reserve"
      />
    </div>
  );
};

export default ReviewForm;

/*
  memo?: string;
  favoriteMenus?: {
    title: string;
    price?: number;
    photo?: string;
  }[];
  photos?: string[]; */
