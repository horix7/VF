import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton,
    MessageBar,
    MessageBarType,  } from 'office-ui-fabric-react';
import React, {  Fragment, useState } from 'react'
import { DialogweUploadByBtn } from '../models/uploadModal'
import ArticleWriter from '../editors/ArticleEditor'
import { Dropdown, IDropdownOption,DropdownMenuItemType, } from 'office-ui-fabric-react/lib/Dropdown';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import Moodal from '../models/models'
import BackendCalls from '../../server/backendCalls'
import { Select, MenuItem, Typography } from "@material-ui/core";
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import FullScreenDialog from '../UI/fullscreenDialog'


// import { CompoundButton } from 'office-ui-fabric-react';


export  default function  ArticleForm  (props: any) {
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // window.location.href = "#topper"    

    const backend = new BackendCalls()
    
    const [selectedItem , setSelectedItem] = useState<IDropdownOption>();
    const [openIt , setOpen ] = useState(false)
    const [premium , setPremium ] = useState(props.content.premium)
    const [head , setHead ] = useState(props.content.head)
    const [body , setBody ] = useState(props.content.body)
    const [images , setImages ] = useState<any>(props.content.images)
    const [made_by , setMade_by ] = useState(props.content.made_by)
    const [ catt , setCatt] = useState(props.content.category)
    const [errorMess, setErrorMess ] = useState(false)
    const [lodading, setlodading ] = useState(false)

    // const userData:  =[ ]

    const publishArticle = async( ) => {

        setlodading(true)

            const article = {
                head: head,
                body: body,
                category: catt,
                images: images,
                published_on : new Date().toString(),
                made_by: "admin"
            }

            console.log(article)
            if (Object.values(article).some((elem : any ) => elem === null || elem === undefined || elem === "")) {
                alert("Missing Some content ")
                setTimeout(() => {
                    setlodading(false)
                }, 2000);
                
            } else {
                const resutlz  = await backend.CreateArticle({article: article}, premium)

                if(resutlz === "error") {
                    setlodading(false)
                    setErrorMess(true)
                }else {
                    props.goBack()
                }
            }
            

        }

      const  updateArticle =  async( ) => {
        setlodading(true)

            const article = {
                head: head,
                body: body,
                category: catt,
                images: images,
            }

            if (Object.values(article).some((elem : any ) => elem === null || elem === undefined || elem === "")) {
                alert("Missing Some content ")
                setTimeout(() => {
                    setlodading(false)
                }, 2000);
                
            } else {
                const resutlz  = await backend.UpdateArticle({article: article, id: props.content.id }, premium)

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


    const [currentOption  , setCurrt] = useState({key: "", text: ""})

        const options: any[] = [
            currentOption,
           ...props.categories,
           { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
           { key: 'kk_', text: 'Create New Category' }
          ];
          
          const popCategory = (event: any , item: any) => {
            
            setSelectedItem(item);
            setCatt(item)
            if(item === "Create New Category") {
                setOpen(true)
            }
        };
        const setcategg = (event: any) => {
            
            setCurrt({key: event.target.value, text: event?.target.value})

        }

        const addCat = () => {
            options.unshift(currentOption)
            console.log(currentOption, options)

        }
           
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

            <FullScreenDialog open={true} close={props.goBack} head={ Object.keys(props.content).length > 1  ? "Update   an Article " : "Create   an Article "} >
                
                <div id="topper" className="articleForm">
                    <input type="text" className="tittleInput" placeholder="Tittle " value={head} onChange={(event: any ) => setHead(event.target.value) }/>
                    <div className="artDrop">
                    <div className="articleWriterC">
                    {/* <Dropdown
                        placeholder="Select Category"
                        // label="Article "
                        selectedKey={selectedItem ? selectedItem.key : undefined}
                        options={options}
                        className="tooogle"
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={popCategory}
                        // styles={dropdownStyles}
                    /> */}
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
                    
                    </div>

                    </div>

                    < DialogweUploadByBtn  setImage={(img: any ) => setImages(img)} />
                    <Toggle className="toogle" label=" Premium " onChange={() => setPremium(!premium)} checked={premium} />

                    <div className="articleWriterC">
                    <ArticleWriter content={body}  changeBody={(event: any ) => setBody(event)}/>
                    
                    </div>
                    <div className="articleWriterC">
                    {errorMess ? <div className="erromessage"><ErroMssage /></div> : null }

                    {Object.keys(props.content).length > 1 ? <button className="publish" onClick={updateArticle}> {lodading ? <Spinner label="Updating..." ariaLive="assertive" labelPosition="right" />  : "Update"} </button> : <button className="publish" onClick={publishArticle}> {lodading ? <Spinner label="publishing..." ariaLive="assertive" labelPosition="right" />  : "Publish"} </button>}

                    <Moodal modalBody={newCategoryForm} openModal={openIt} closeModal={(bool: boolean ) => setOpen(bool)}/>
                 
                    </div>
                </div>
            </FullScreenDialog>
            </Fragment>
        )
}





