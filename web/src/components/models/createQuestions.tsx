import React, { Key } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Questionaire from './questionModal'

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog() {
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = React.useState<{[key: string] : any}>({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const createData = (newData : any ) => {

      let newD = {...data}
    
      newD[newData.name] = newData.data

      setdata(newD)
      console.log(data)
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
      Edit Fitness/Meal Plan Question 
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        maxWidth={"md"}
        fullWidth={true}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          create meal plan questions 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>


            <Questionaire data2={data} createData={createData} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button color="secondary">
                save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
