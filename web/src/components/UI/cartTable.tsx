import React, { Key, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {trimWorldsSmall } from '../../server/conast&func'
import { ActionButton } from "@fluentui/react"
import { IIconProps, Icon } from 'office-ui-fabric-react';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 1000,
    },
    primary: {
        color: "#ffb300"
    },
    secondary: {
        color: "#ffb300"
    },
    demo: {
      backgroundColor: "transparent",
      color: "#f9fbe7"
    }
  }),
);



export default function InteractiveList() {
  const classes = useStyles();
  const dense= true

  const [localCart , seetCart ] = useState(JSON.parse(localStorage.cart))

  const deleteElem = (id: string | boolean) => {
    if(id) {
    
    let newLocaler: any[]= []
    let secondArray: any[] = []
    localCart.forEach((elem: any) => {
      if(elem.id === id) {
        secondArray.push(elem)
      }else {
        newLocaler.push(elem)
      }
    });

    if(secondArray.length > 1 ) {
      secondArray.length = secondArray.length - 1
      newLocaler = [...newLocaler, ...secondArray]
    }


    console.log(newLocaler, secondArray)

    seetCart(newLocaler)
    localStorage.setItem("cart", JSON.stringify(newLocaler))

    } else {
    seetCart([])
    localStorage.setItem("cart", '[]')
    }
  }

  const clearIcon: IIconProps = { iconName: 'Clear' };
  return (
    <div className={classes.root}>

          <div className={classes.demo}>
            <List dense={dense}>
              {localCart.map((elem: any, key: Key) => (
                <ListItem key={key}>
                  <ListItemAvatar>
                      <img src={elem.images[0]} width="40px" style={{objectFit:"cover", height: "30px"}} alt=""/>
                  </ListItemAvatar>
                  <ListItemText
                    style={{color: "white"}}
                    primary={trimWorldsSmall(elem.head)}
                   secondary={(<div className={classes.secondary}>  $ {Number(elem.price)}   &nbsp;  <span className="multiper"> <Icon iconName="CalculatorMultiply"/> </span>  &nbsp;   { Number(elem.amount || 1 )}</div>)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                     
                      <DeleteOutlineIcon  style={{color: "white", fontSize:"x-large"}} onClick={() => deleteElem(elem.id)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <ActionButton text="Clear All " iconProps={clearIcon} onClick={() => deleteElem(false)}/>
            <div className="total">
              ToTal Amount : <span className="total_price"> $ &nbsp; { localCart.length >= 1 ?  localCart.map((elem: any) =>{
                if(elem.amount) {
                  return Number(elem.price) * Number(elem.amount )
                } else return Number(elem.price)
              }).reduce((a: number,b: number) => a + b ) : 0 }</span>
            </div>
          </div>
    </div>
  );
}
