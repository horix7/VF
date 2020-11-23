import { TextField } from '@material-ui/core';
import { MessageBar , MessageBarType  } from 'office-ui-fabric-react';
import React, { Fragment, useState } from 'react'
import { DialogweUploadByBtn } from '../models/uploadModal'
import BackendCalls from '../../server/backendCalls'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import FullScreenDialog from '../UI/fullscreenDialog'


export  default function  CreateMeal  (props: any) {
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
     

    const [head , setHead ] = useState(props.content.head)
    const [body , setBody ] = useState(props.content.body)
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







