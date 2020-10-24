import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton  } from 'office-ui-fabric-react';
import React, {  FormEvent, Fragment, useState } from 'react'
import { UploadMultipleFile } from '../models/uploadModalMultiple'
import ArticleWriter from '../editors/ArticleEditor'
import { Dropdown, IDropdownOption,DropdownMenuItemType, } from 'office-ui-fabric-react/lib/Dropdown';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import Moodal from '../models/models'
// import { CompoundButton } from 'office-ui-fabric-react';


export  default function  ProductForm  (props: any) {
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedItem , setSelectedItem] = useState<IDropdownOption>();
    const [openIt , setOpen ] = useState(false)
    const [premium , setPremium ] = useState(false)
    
        const options: IDropdownOption[] = [
            { key: 'fitness', text: 'fitness' },
            { key: 'Meals', text: 'Meals' },
            { key: 'personal Development', text: 'personal Development' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
            { key: 'kk_', text: 'Create New Category' }
          ];
          
          const popCategory = (event: FormEvent<HTMLDivElement>, item: any) => {
            setSelectedItem(item);
            if(item.key === "kk_") {
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
     
          const newCategoryForm = (
             <Fragment>
                  <div style={modalStyle} className={classes.paper}>
                    <TextField placeholder="Category Name" />
                    <div className="articleWriterC">
                    <PrimaryButton text="add" />
                    </div>
                </div>
             </Fragment> 
          )
        return (
            
            <Fragment>
                
                <div className="articleForm">
                    <input type="text" className="tittleInput" placeholder="Product Name"/>
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

                    <UploadMultipleFile info={{upload: "Product Images" , description: "Select Your Profile Pictures "}} />
                    <Toggle className="toogle" label=" Premium " onChange={() => setPremium(!premium)} checked={premium} />

                    <div className="articleWriterC">
                    <ArticleWriter />
                    
                    </div>

                    <div className="articleWriterC">
                   <button className="publish"> Publish</button>

                    <Moodal modalBody={newCategoryForm} openModal={openIt} closeModal={(bool: boolean ) => setOpen(bool)}/>
                 
                    </div>
                </div>
 
            </Fragment>
        )
}





