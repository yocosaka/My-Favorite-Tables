import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import styles from './BasicModal.module.scss';

type PropTypes = {
  Component: React.FC;
};

const BasicModal = ({ Component }: PropTypes) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalBox}>
          <Component />
        </Box>
      </Modal>
    </div>
  );
};
export default BasicModal;
