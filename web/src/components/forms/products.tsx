import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton,
    MessageBar,
    MessageBarType,  } from 'office-ui-fabric-react';
import React, {  Component, Fragment, useState } from 'react'
import { UploadMultipleFile } from '../models/uploadModalMultiple'
import ArticleWriter from '../editors/ArticleEditor'
import { Dropdown, IDropdownOption,DropdownMenuItemType, } from 'office-ui-fabric-react/lib/Dropdown';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Moodal from '../models/models'
import { Icon } from '@fluentui/react/lib/Icon'
import BackendCalls from '../../server/backendCalls'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import FullScreenDialog from '../UI/fullscreenDialog'
import ProSpecs from '../models/specsModel'
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import { Select, MenuItem, Typography } from "@material-ui/core";

class  SpecsChips extends Component<any> {

    state: {[key: string ]: any } =  {
        chipData: [
            {key: Date.now() , label: "options"},

        ]
    }

     handleDelete = (chipToDelete: string) => () => {

        this.props.deleteOne(chipToDelete)
        this.getAllData()
      };
    

componentDidMount() {
   this.getAllData()
}

getAllData = () => {
     
    let chipData = [...this.state.chipData]

  this.setState({
      chipData:  chipData.concat(...this.props.specs.map((elem: any) => {
        return {
            key: Date.now() * Math.round(Math.random() * 12012301),
            label : elem.name
        }
    }))
  })
}

   render() {     
       
        return (
          <Paper component="ul" style={ {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: "5px",
            margin: 0,
          }}>
            {this.state.chipData.map((data: any) => {
              let icon;
      
              if (data.label === 'options') {
                icon = <SettingsEthernetIcon />;
              }
      
              return (
                <li key={data.key}>
                  <Chip
                    icon={icon}
                    label={data.label}
                    onDelete={data.label === 'options' ? undefined : this.handleDelete(data.label)}
                    // className={classes.chip}
                    style={{margin: "5px"}}
                  />
                </li>
              );
            })}
          </Paper>
        );
      
   }
}

// import { CompoundButton } from 'office-ui-fabric-react';


export  default function  ArticleForm  (props: any) {
  
    const backend = new BackendCalls()
    
    const [selectedItem , setSelectedItem] = useState<any>();
    const [openIt , setOpen ] = useState(false)
    const [head , setHead ] = useState(props.content.head)
    const [body , setBody ] = useState(props.content.description)
    const [price , setPrice ] = useState(props.content.price)
    const [specs , setSpecs ] = useState(props.content.specs || [])
    const [images , setImages ] = useState<any>(props.content.images || [])
    const [ catt , setCatt] = useState(props.content.category)
    const [errorMess, setErrorMess ] = useState(false)
    const [lodading, setlodading ] = useState(false)

    const SetNewImages = (imgs: any[]) => {
        const newImg = [...images, ...imgs]
        setImages(newImg)
    }


    let SpecsInfo =  () => specs.length >= 1 ? <SpecsChips specs={specs} deleteOne={(id: string) => {
        setSpecs(specs.filter((elem: any) => elem.name !== id))
    }} />  : null

    const createData = (data: any ) => {
        setSpecs(specs.concat(data))
        SpecsInfo()
    }

    const publishProduct = async( ) => {
        setlodading(true)

            const product = {
                head: head,
                description: body,
                price: price,
                category: catt,
                images: images,
                specs: specs,
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
                    specs: specs,
                    made_by: "admin"
                }
    
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
    
    const [currentOption  , setCurrt] = useState({key: 21302013 , text: ""})

        const options: any[] = [
            currentOption,
           ...props.categories,
           { key: 'divider_1', text: '', itemType: DropdownMenuItemType.Divider },
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
          const [open1, setOpen2] = React.useState(false);
            const handleClose = () => {
                setOpen2(false);
            };

            const handleOpen = () => {
                setOpen2(true);
            };

            

                
                const newCategoryForm = (
             <Fragment>
                  <div style={modalStyle} className={classes.paper}>
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
                    {/* <Dropdown
                        placeholder="Select Category"
                        // label="Article "
                        // selectedKey={selectedItem ? selectedItem.key : undefined}
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

                    <div className="articleWriterC">
                    <SpecsInfo />
                    <ProSpecs getOptions={(data: any) => createData(data)}/>
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





