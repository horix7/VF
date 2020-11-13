import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton,
    Stack,
    IStackTokens,
    MessageBar,
    MessageBarType,  } from 'office-ui-fabric-react';
import React, {  FormEvent, Fragment, useState } from 'react'
import { UploadMultipleFile } from '../models/uploadModalMultiple'
import ArticleWriter from '../editors/ArticleEditor'
import { Dropdown, IDropdownOption,DropdownMenuItemType, } from 'office-ui-fabric-react/lib/Dropdown';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import Moodal from '../models/models'
import { Icon } from '@fluentui/react/lib/Icon'
import BackendCalls from '../../server/backendCalls'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import FullScreenDialog from '../UI/fullscreenDialog'



// import { CompoundButton } from 'office-ui-fabric-react';


export  default function  ArticleForm  (props: any) {
  
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const backend = new BackendCalls()
    
    const [selectedItem , setSelectedItem] = useState<IDropdownOption>();
    const [openIt , setOpen ] = useState(false)
    const [premium , setPremium ] = useState(props.content.premium)
    const [head , setHead ] = useState(props.content.head)
    const [body , setBody ] = useState(props.content.description)
    const [price , setPrice ] = useState(props.content.price)
    const [images , setImages ] = useState<any>(props.content.images || [])
    const [made_by , setMade_by ] = useState(props.content.made_by)
    const [ catt , setCatt] = useState(props.content.category)
    const [errorMess, setErrorMess ] = useState(false)
    const [lodading, setlodading ] = useState(false)

    // const userData:  =[ ]

    const SetNewImages = (imgs: any[]) => {

        const newImg = [...images, ...imgs]
        setImages(newImg)

    }
    const publishProduct = async( ) => {
        setlodading(true)

            const product = {
                head: head,
                description: body,
                price: price,
                category: catt,
                images: images,
                published_on : new Date().toString(),
                made_by: "admin"
            }

            if (Object.values(product).some((elem : any ) => elem === null || elem === undefined || elem === "")) {
                alert("Missing Some content ")
                setTimeout(() => {
                    setlodading(false)
                }, 2000);
                
            } else {
                const resutlz  = await backend.CreateProduct({product: product})

                if(resutlz === "error") {
                    setlodading(false)
                    setErrorMess(true)
                }else {
                    props.goBack()
                }
            }
            

        }

        const updateProduct =  async() => {
            setlodading(true)
    
                const product = {
                    head: head,
                    description: body,
                    price: price,
                    category: catt,
                    images: images,
                    made_by: "admin"
                }
    
                console.log(product , props.content)
                if (Object.values(product).some((elem : any ) => elem === null || elem === undefined || elem === "")) {
                    alert("Missing Some content ")
                    setTimeout(() => {
                        setlodading(false)
                    }, 2000);
                    
                } else {
                    const resutlz  = await backend.UpdateProduct({id: props.content.id ,product: product})
    
                    if(resutlz === "error") {
                        setlodading(false)
                        setErrorMess(true)
                    }else {
                        props.goBack()
                    }
                }
                
    
            }
    
    const [currentOption  , setCurrt] = useState({key: "", text: ""})

        const options: any[] = [
            currentOption,
           ...props.categories,
           { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
           { key: 'kk_', text: 'Create New Category' }
          ];
          
          const popCategory = (event: any , item: any) => {
            setSelectedItem(item);
            
            setCatt(item.key)
            if(item.key === "kk_") {
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
                  <div style={modalStyle} className={classes.paper}>
                    <TextField placeholder="Category Name" onChange={(event: any) => setcategg(event)}/>
                    <div className="articleWriterC">
                    <PrimaryButton text="add"  onClick={(event) =>{
                        addCat()
                        setOpen(false)
                        popCategory(event, options[0])
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

            <FullScreenDialog open={true} close={props.goBack} head={ Object.keys(props.content).length > 1  ? "Update  A Product" : "Create  A Product"} >
                
                <div className="articleForm">
                <div className="twoEleme">
                <input type="text" className="producttittle" placeholder="Tittle " value={head} onChange={(event: any ) => setHead(event.target.value) }/>
                <div className="inputz inputIconz2">
                    <Icon iconName="Money" className="inputIcon"/>
                  
                   <input type="number" className="priceInput inputs"  placeholder="Price " value={price} onChange={(event: any ) => setPrice(event.target.value) }/>

                <div></div>
                   </div>
                </div>
                    <div className="artDrop">
                    <div className="articleWriterC">
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
                    </div>

                    </div>

                   {images ? <div className="presesntImg">
                    {images.length > 4 ? [images[0], images[1], images[2], images[3]].map((elem : any ) => (<img width="70px" src={elem} alt="" />)) : images.map((elem: any) => <img width="70px" src={elem} alt=""/>)} 
                   </div> : null}
                   < UploadMultipleFile  setImages={(img: any[] ) => SetNewImages(img)} />
                    <div className="articleWriterC">
                    <ArticleWriter content={body}  changeBody={(event: any ) => setBody(event)}/>
                    
                    </div>
                    <div className="articleWriterC">
                    {errorMess ? <div className="erromessage"><ErroMssage /></div> : null }

                    
                    {Object.keys(props.content).length > 1 ? <button className="publish" onClick={updateProduct}> {lodading ? <Spinner label="updating..." ariaLive="assertive" labelPosition="right" />  : "Update"} </button> : <button className="publish" onClick={publishProduct}> {lodading ? <Spinner label="publishing..." ariaLive="assertive" labelPosition="right" />  : "Publish"} </button>
} 
                    <Moodal modalBody={newCategoryForm} openModal={openIt} closeModal={(bool: boolean ) => setOpen(bool)}/>
                 
                    </div>
                </div>
             </FullScreenDialog>
            </Fragment>
        )
}





