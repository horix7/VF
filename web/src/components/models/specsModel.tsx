import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Specs from "../UI/sepcs";
import { DefaultButton } from '@fluentui/react'
import { DialogTitle } from '@material-ui/core';



export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  correctData: Function;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, correctData } = props;

  const [name, setName] = useState("")

  const handleClose = () => {
    
    onClose(selectedValue);
  };

  const handleCloseSubmit = (data: any) => {
    correctData(data)
    onClose("done")
  }


  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title"> {name} </DialogTitle>
        <Specs name={(e: any) => setName(e)} submit={(data: any) => handleCloseSubmit(data) } />

      </Dialog>
  );
}

export default function SimpleDialogDemo(props: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DefaultButton onClick={handleClickOpen}>
        Product options  
      </DefaultButton>
      <SimpleDialog selectedValue={"selectedValue"} correctData={props.getOptions} open={open} onClose={handleClose} />
    </div>
  );
}
