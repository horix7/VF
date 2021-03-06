import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton , MessageBar , MessageBarType  } from 'office-ui-fabric-react';
import React, { Fragment, useState } from 'react'
import { DialogweUploadByIcn, DialogweUploadByBtn } from '../models/uploadModal'
import { Dropdown, IDropdownOption,DropdownMenuItemType, } from 'office-ui-fabric-react/lib/Dropdown';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import {Icon } from "@fluentui/react/lib/Icon"
import Moodal from '../models/models'
import ReactPlayer from "react-player"
import BackendCalls from '../../server/backendCalls'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Select, MenuItem, Typography } from "@material-ui/core";
import FullScreenDialog from '../UI/fullscreenDialog'

// import { CompoundButton } from 'office-ui-fabric-react';


export  default function  CreateVideo  (props: any) {
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
     

    const [selectedItem , setSelectedItem] = useState<IDropdownOption>();
    const [openIt , setOpen ] = useState(false)
    const [premium , setPremium ] = useState(props.content.premium)
    const [head , setHead ] = useState(props.content.head)
    const [body , setBody ] = useState(props.content.body)
    const [uploaded , setUploaded ] = useState(false)
    const [images , setImages ] = useState(props.content.images)
    const [ catt , setCatt] = useState(props.content.category)
    const [made_by , setMade_by ] = useState(props.content.made_by)
    const [errorMess, setErrorMess ] = useState(false)
    const [lodading, setlodading ] = useState(false)


    const backend = new BackendCalls()

    const publishVideo = async( ) => {
      setlodading(true)

          const video = {
              head: head,
              body: body,
              category: catt,
              images: images,
              published_on : new Date().toString(),
              made_by: "admin"
          }

          if (Object.values(video).some((elem : any ) => elem === null || elem === undefined || elem === "")) {
              alert("Missing Some content ")
              setTimeout(() => {
                  setlodading(false)
              }, 2000);
              
          } else {
              const resutlz  = await backend.CreateVideo({video: video}, premium)

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
  
            const video = {
                head: head,
                body: body,
                category: catt,
                images: images,
            }
  
            if (Object.values(video).some((elem : any ) => elem === null || elem === undefined || elem === "")) {
                alert("Missing Some content ")
                setTimeout(() => {
                    setlodading(false)
                }, 2000);
                
            } else {
                const resutlz  = await backend.UpdateVideo({video: video, id: props.content.id}, premium)
  
                if(resutlz === "error") {
                    setlodading(false)
                    setErrorMess(true)
                }else {
                    props.goBack()
                }
            }
            
  
        }
  
        const [open1, setOpen2] = React.useState(false);
        const handleClose = () => {
            setOpen2(false);
        };

        const handleOpen = () => {
            setOpen2(true);
        };
  
          

    // const userData

    const [currentOption  , setCurrt] = useState({key: "", text: ""})

        const options: any[] = [
            currentOption,
           ...props.categories,
           { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
           { key: 'kk_', text: 'Create New Category' }
          ];
       
       const addCat = () => {
        options.unshift(currentOption)

    }
       
     
    const setcategg = (event: any) => {
            
        setCurrt({key: event.target.value, text: event?.target.value})

    }
                   
    const popCategory = (event: any , item: any) => {
            
        setSelectedItem(item);
        setCatt(item)
        if(item === "Create New Category") {
            setOpen(true)
        }
    };
           
            function getModalStyle() {
                const top = 30 ;
                const left = 50 ;
            
                return {
                top: `${top}%`,
                left: `${left}%`,
                transform: `translate(-${top}%, -${left}%)`,
                };
            }
          const useStyles = makeStyles((theme: Theme) =>
            createStyles({
                paper: {
                position: 'absolute',
                width: 400,
                backgroundColor: "black",
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
                },
            }),
            );
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const classes = useStyles();
          // getModalStyle is not a pure function, we roll the style only on the first render
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [modalStyle] = React.useState(getModalStyle);

          
      const checkVideoType = (id: any) => {

        if(id) {
        let newId = id.split("")
        newId.length = 38
        const mnewid = newId.join('')

        return mnewid === "https://firebasestorage.googleapis.com"
        } else {
            return false 
        }
      }
     
          const iconPropStyle = "uploadIcon"
          const newCategoryForm = (
            <Fragment>
                 <div  style={modalStyle} className={classes.paper}>
                   <TextField placeholder="Category Name" onChange={(event: any) => setcategg(event)}/>
                   <div className="articleWriterC">
                   <PrimaryButton text="add"  onClick={(event) =>{
                       addCat()
                       setOpen(false)
                       popCategory(event, options[0].text)
                       }} />
                   </div>
               </div>
            </Fragment> 
         )


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


        return (
            
          
        <Fragment>
            <FullScreenDialog open={true} close={props.goBack} head={Object.keys(props.content).length > 1 ? "Update Video" : "Create Video"}>

            
            <div id="topper" > 
            </div>
                <div className="CreateVideo">
                   <div className="videform">

                    <div className="inputz">
                    <input type="text" placeholder="Video Tittle " value={head}  className="inputs" onChange={(event: any ) => setHead(event.target.value)}/>
                    </div>
                   <div className="inputz inputIconz">
                    <Icon iconName="MSNVideos" className="inputIcon"/>
                   <input type="text" placeholder="Video Link "  value={body} className="inputs" onChange={(event: any) => setBody(event.target.value)}/>
                  
                   <DialogweUploadByIcn  claas={iconPropStyle} setImage={(img: any ) => setBody(img)} />


                   </div>

                   <div className="leftMM">
{/*                    
                   <Dropdown
                        placeholder="Select Category"
                        // label="Article "
                        selectedKey={selectedItem ? selectedItem.key : undefined}
                        options={options}
                        className="tooogle"
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={popCategory}
                        // styles={dropdownStyles}
                    />

                   */}
                    <Typography> Select Category  </Typography>

                    <Select
                    open={open1}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={selectedItem || null}
                    label="select category"
                    onChange={(e: any) => popCategory(e, e.target.value)}
                    >
                    {options.map((elem: any) => (<MenuItem value={elem.text} key={elem.key} >{elem.text} </MenuItem>))}
                   
                    
                    </Select>
                    

                   <div className="articleWriterC">

                    < DialogweUploadByBtn  setImage={(img: any ) => setImages(img)} />
                  
                   </div>

                     <Toggle className="toogle" label=" Premium " onChange={() => setPremium(!premium)} checked={premium} />
                     <Moodal modalBody={newCategoryForm} openModal={openIt} closeModal={() => setOpen(false)}/>
                        
                     {errorMess ? <div className="erromessage"><ErroMssage /></div> : null }


                   {Object.keys(props.content).length > 1 ?  <button className="publish" onClick={updateVideo}> {lodading ? <Spinner label="Updating..." ariaLive="assertive" labelPosition="right" />  : "Update"} </button> :  <button className="publish" onClick={publishVideo}> {lodading ? <Spinner label="publishing..." ariaLive="assertive" labelPosition="right" />  : "Publish"} </button>}

                    </div>

                   </div>

                   <div className="videoPreview">
                    

                    <div>
                    { checkVideoType(body) ? <div>
                    <video src={body} width="100%" className="previewdVid" autoPlay={true} muted controls={false}></video>
                    </div>  :
                    <ReactPlayer controls={false} width="100%" className="previewdVid" muted playing url={body} />
                  }
                    <h3>{head}</h3>
 
 
                    </div>
 
                     </div>
                    
                </div>
                </FullScreenDialog>
            </Fragment>
         )
}







