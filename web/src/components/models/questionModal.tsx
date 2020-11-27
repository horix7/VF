import React, { useState, Key } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton, ListItemSecondaryAction } from '@material-ui/core';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  correctData: Function;
  data: any;
}


export default function SimpleDialogDemo(props: any) {
  const [open, setOpen] = React.useState(false);
  const [name, setname] = React.useState("");
  const [data, setdata] = React.useState({});
function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, correctData, data } = props;

  const [ectomorph, setectomorph] = useState(data.data.ectomorph  || "")
  const [endomorph, setendomorph] = useState(data.data.mesomorph  || "")
  const [mesomorph, setmesomorph] = useState(data.data.endomorph  || "")

  console.log(data.data)

  const handleClose = () => {
        onClose(selectedValue);
  };

  const handleCloseSubmit = (ndata: any) => {
    if([ectomorph, mesomorph, endomorph].some((elem: string ) => elem === "")) {
        alert("Fil In All Inputs")
    } else {
        correctData(ndata)
        onClose("done")
    }
    
  }


  return (
        
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title"  maxWidth={"sm"}  fullWidth={true} open={open}>
      <DialogTitle id="simple-dialog-title"> {data.name} </DialogTitle>
        <DialogContent>
            
        <TextField  color="secondary"  label="ectomorph" style={{marginTop:"10px"}} fullWidth={true} variant="filled" value={ectomorph} onChange={(e:any) => setectomorph(e.target.value)} />
        <br/>
        <TextField  color="secondary"  label="mesomorph"  style={{marginTop:"10px"}} fullWidth={true} variant="filled" value={mesomorph} onChange={(e:any) => setmesomorph(e.target.value)} />
        <br/>

        <TextField  color="secondary"  label="endomorph"  style={{marginTop:"10px"}} fullWidth={true} variant="filled" value={endomorph} onChange={(e:any) => setendomorph(e.target.value)} />

        
        </DialogContent>

        <DialogActions>
        <Button color="secondary" variant="outlined" onClick={() =>  handleCloseSubmit({
            name: props.data.name,
            data: {
                ectomorph: ectomorph,
                mesomorph: mesomorph,
                endomorph: endomorph
            }
        }) }> Submit </Button>
        </DialogActions>
      </Dialog>
  );
}

  const handleClickOpen = () => {
      if(name === "") {
          alert("Provide the Question Name First ")

      } else {
          setdata({})
        setOpen(true);
      }
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {Object.keys(props.data2).length >= 1 ? <List>
                {Object.keys(props.data2).map((elem: any , key: Key) => 
                    <ListItem key={key}>
                        <ListItemText
                         primary={elem} 

                         secondary={
                                `ectomorph:  ${props.data2[elem]["ectomorph"]} 
                                    mesomorph:  ${props.data2[elem]["mesomorph"]}
                                    endomorph:  ${props.data2[elem]["endomorph"]}
                                    `
                            
                            }
                        />

                        <ListItemSecondaryAction>
                            <IconButton onClick={() => {
                                setname(elem)
                                setdata(props.data2[elem])
                                setTimeout(() => {
                                    setOpen(true)
                                }, 200)
                            }} edge="end">
                                <EditSharpIcon color="secondary" />
                            </IconButton>

                            <IconButton onClick={() => {
                                setname(elem)
                                const newDataq : {[key: string] : any }   = {}
                                Object.keys(props.data2).filter((elm: any) =>  elm !== elem).forEach((element: string ) => {
                                    newDataq[element] = props.data2[element]
                                });
                                props.setdata(newDataq)
                            }}
                             edge="end">
                                <DeleteOutlineIcon color="secondary" />
                            </IconButton>

                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List> : null }
     <div className="question">
    <TextField placeholder="Question Name " fullWidth={true}   color="secondary" variant="filled" onChange={(e: any) => setname(e.target.value)}/>
     <Button style={{marginTop: "6px"}} variant="outlined" onClick={handleClickOpen}>
       Answers
      </Button>
     </div>

      <SimpleDialog selectedValue={"selectedValue"} open={open} onClose={handleClose} correctData={props.createData} data={{
          name: name,
          data: data
      }} />
    </div>
  );
}
