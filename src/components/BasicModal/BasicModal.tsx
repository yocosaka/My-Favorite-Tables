import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { BtnSizeType, BtnVariantType } from 'src/types/types';
import styles from './BasicModal.module.scss';
import Button from '../Button';

type PropTypes = {
  ContentComponent: React.FunctionComponent;
  btnText?: string;
  btnSize?: BtnSizeType;
  btnVariant?: BtnVariantType;
};

const BasicModal = ({
  ContentComponent,
  btnText = '',
  btnSize = 'medium',
  btnVariant = 'secondary',
}: PropTypes) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} size={btnSize} variant={btnVariant}>
        {btnText ? btnText : 'Open Modal'}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalBox}>
          <ContentComponent />
        </Box>
      </Modal>
    </div>
  );
};
export default BasicModal;
