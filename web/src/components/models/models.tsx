import React from 'react';
import Modal from '@material-ui/core/Modal';






export default function SimpleModal(props : any ) {



  const handleClose = () => {
    props.closeModal(false)
  };


  return (
    <div>
     
      <Modal
        open={props.openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {props.modalBody}
      </Modal>
    </div>
  );
}