import { Chip, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { MessageBar , MessageBarType  } from 'office-ui-fabric-react';
import React, { Fragment, Key, useState } from 'react'
import { DialogweUploadByBtn } from '../models/uploadModal'
import BackendCalls from '../../server/backendCalls'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import FullScreenDialog from '../UI/fullscreenDialog'
import { Label } from '@material-ui/icons';


export  default function  CreateMeal  (props: any) {
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
     

    const [head , setHead ] = useState(props.content.head)
    const [body , setBody ] = useState(props.content.body)
    const [chips , setChips ] = useState(props.content.chips || "")
    const [price , setprice ] = useState(props.content.price)
    const [images , setImages ] = useState(props.content.images)
    const [errorMess, setErrorMess ] = useState(false)
    const [lodading, setlodading ] = useState(false)


    const backend = new BackendCalls()

    const publishVideo = async( ) => {
      setlodading(true)

          const plan = {
              head: head,
              body: body,
              images: images,
              price: price,
              published_on : new Date().toString(),
              made_by: "admin"
          }

          if (Object.values(plan).some((elem : any ) => elem === null || elem === undefined || elem === "")) {
              alert("Missing Some content ")
              setTimeout(() => {
                  setlodading(false)
              }, 2000);
              
          } else {
              const resutlz  = await backend.createMealPlan({product: plan})

              if(resutlz === "error") {
                  setlodading(false)
                  setErrorMess(true)
              }else {
                  props.goBack()
              }
          }
          

      }


        
      
    const updateVideo = async( ) => {
        setlodading(true)
  
            const plans = {
                head: head,
                body: body,
                price: price,
                images: images,
            }
  
            if (Object.values(plans).some((elem : any ) => elem === null || elem === undefined || elem === "")) {
                alert("Missing Some content ")
                setTimeout(() => {
                    setlodading(false)
                }, 2000);
                
            } else {
                const resutlz  = await backend.UpdateMealpPlan({product: plans, id: props.content.id})
  
                if(resutlz === "error") {
                    setlodading(false)
                    setErrorMess(true)
                }else {
                    props.goBack()
                }
            }
            
  
        }

  
          
        const [type, setAge] = React.useState<string | number>('');
        const [open, setOpen] = React.useState(false);
      
        const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
          setAge(event.target.value as number);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
      
        const handleOpen = () => {
          setOpen(true);
        };
      
    
        const [type2, setAge2] = React.useState<string | number>('');
        const [open2, setOpen2] = React.useState(false);
      
        const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
          setAge2(event.target.value as number);
        };
      
        const handleClose2 = () => {
          setOpen2(false);
        };
      
        const handleOpen2 = () => {
          setOpen2(true);
        };
      
    


          const ErroMssage = (p: any) => (
            <MessageBar
              messageBarType={MessageBarType.error}
              isMultiline={false}
              onDismiss={p.resetChoice}
              dismissButtonAriaLabel="ShieldAlert"
            >
                Something Went Wrong  
             
            </MessageBar>
          );

            console.log(props)
        return (
            
          
        <Fragment>
            <FullScreenDialog open={true} close={props.goBack} head={Object.keys(props.content).length > 1 ? "Update Meal Plan" : "Create Meal Plan"}>

            
            <div id="topper" > 
            </div>
                <div className="">
                   <div className="mealFromPlan">

                    <div className="mealInputz">
                    <TextField rows={3} rowsMax={5} style={{color: "black", borderColor: "black"}} color="primary" className="mealInput" type="text" placeholder="Meal Plan Name" value={head}  variant="filled"  onChange={(event: any ) => setHead(event.target.value)}/>
                    </div>

                    <div className="mealInputz">
                    <TextField rows={3} rowsMax={5} style={{color: "black", borderColor: "black"}} color="primary" className="mealInput" type="text" placeholder="Meal Plan Description" multiline value={body}  variant="filled"  onChange={(event: any ) => setBody(event.target.value)}/>
                    </div>

                    <div className="mealInputz towdivz">

                    <div className="selectHoolder">

                    <Typography>
                        Made For 
                    </Typography>
                    <Select
                    className="fullWid"
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        label="Made For"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={type}
                        onChange={handleChange}
                        >
                        <MenuItem value="">
                        </MenuItem>
                        <MenuItem value="Vegeterian"> Vegeterian </MenuItem>
                        <MenuItem value="Vegan">Vegan</MenuItem>
                        <MenuItem value="Meat Eaters">Meat Eaters</MenuItem>
                        </Select>

                        </div>

                        <div className="selectHoolder">
                            <Typography>
                                Target 
                            </Typography>

                            <Select
                            className="fullWid"
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        label="Target"
                        open={open2}
                        onClose={handleClose2}
                        onOpen={handleOpen2}
                        value={type2}
                        onChange={handleChange2}
                        >
                        <MenuItem value="">
                        </MenuItem> 
                        <MenuItem value="Lose"> Lose weight </MenuItem>
                        <MenuItem value="Gain">Gain weight </MenuItem>
                        <MenuItem value="Mantain">Mantain weight </MenuItem>
                        </Select>
                    
                        </div>
                    </div>
                    <div className="mealInputz">
                    <div className="chipManager">
                    {chips.split("  ").map((elem: string, key: Key) => <Chip className="chip" label={elem} key={key} />)}
                    </div>
                    <TextField rows={2}  style={{color: "black", borderColor: "black"}} color="primary" className="mealInput" type="text" label="Meal Plan Food (vagetables meats Dairy and protein ) double spce to create new one " multiline value={chips}  variant="filled"  onChange={(event: any ) => setChips(event.target.value)}/>
                    </div>

                    <div className="mealInputz">
                    <TextField rows={3} rowsMax={5} style={{color: "black", borderColor: "black"}} color="primary" className="mealInput" type="number" placeholder="COst"  label="Price"  value={price}  variant="filled"  onChange={(event: any ) => setprice(event.target.value)}/>
                    </div>



                   <div className="">
                 
                   <div className="articleWriterC">

                    < DialogweUploadByBtn  setImage={(img: any ) => setImages(img)} />
                  
                   </div>

                     {errorMess ? <div className="erromessage"><ErroMssage /></div> : null }

                     {Object.keys(props.content).length > 1 ?  <button className="pubish2" onClick={updateVideo}> {lodading ? <Spinner label="Updating..." ariaLive="assertive" labelPosition="right" />  : "Update"} </button> :  <button className="pubish2" onClick={publishVideo}> {lodading ? <Spinner label="publishing..." ariaLive="assertive" labelPosition="right" />  : "Publish"} </button>}

                    </div>

                   </div>

                 
                </div>
                </FullScreenDialog>
            </Fragment>
         )
}







