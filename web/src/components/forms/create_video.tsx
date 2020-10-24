import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton  } from 'office-ui-fabric-react';
import React, {  FormEvent, Fragment, FunctionComponent, useState } from 'react'
import { DialogweUploadByIcn, DialogweUploadByBtn } from '../models/uploadModal'
import { Dropdown, IDropdownOption,DropdownMenuItemType, } from 'office-ui-fabric-react/lib/Dropdown';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import {Icon } from "@fluentui/react/lib/Icon"
import Moodal from '../models/models'
// import { CompoundButton } from 'office-ui-fabric-react';


export  default function  CreateVideo  (props: any) {
  
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
     
          const iconPropStyle = "inputIcon uploadIcon"
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
                <div className="CreateVideo">
                    <div className="inputz">
                    <input type="text" placeholder="Video Tittle "  className="inputs"/>
                    </div>
                   <div className="inputz inputIconz">
                    <Icon iconName="MSNVideos" className="inputIcon"/>
                   <input type="text" placeholder="Video Link "  className="inputs"/>
                   <DialogweUploadByIcn  claas={iconPropStyle} />


                   </div>

                   <div className="">
                   
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
                   <div className="articleWriterC">

                    <DialogweUploadByBtn />
                  
                   </div>

                     <Toggle className="toogle" label=" Premium " onChange={() => setPremium(!premium)} checked={premium} />
                     <Moodal modalBody={newCategoryForm} openModal={openIt} closeModal={() => setOpen(false)}/>
                        
                    <button className="publish">Publish </button>
                </div>
            </Fragment>
         )
}







