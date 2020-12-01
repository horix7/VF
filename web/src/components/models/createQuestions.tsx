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
import BackendCalls from '../../server/backendCalls'
import { CircularProgress } from '@material-ui/core';

const backend = new BackendCalls()

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}


export default function DraggableDialog(props: any) {

  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [data, setdata] = React.useState<{[key: string] : any}>(props.data);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const createData = (newData : any ) => {

      let newD = {...data}
    
      newD[newData.name] = newData.data

      setdata(newD)
     
  }

  


  const saveData = async() => {
    setloading(true)
    if(Object.values(data).length < 1) {
       alert("No Information Provided")
    } else {
        const createData = await backend.CreatePlanQuestion(data)

        if(createData === "error") {
            setloading(false)
        }else {
            setloading(false)
        }
 
    }
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


            <Questionaire data2={data} setdata={setdata} createData={createData} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            close
          </Button>
          <Button color="secondary" onClick={saveData}>

               {loading ? <CircularProgress /> : "save"}

          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
