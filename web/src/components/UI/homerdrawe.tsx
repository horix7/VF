import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import {NavLink } from 'react-router-dom'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Icon } from "@fluentui/react"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor: "black"

  },
  fullList: {
    width: 'auto',
    backgroundColor: "black"
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer(props: any) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}

      style={{backgroundColor: "black", height: "100vh"}}
      role="presentation">
      <List>
        <div className="naav searBar">
        <SearchBox placeholder="Search" onSearch={newValue => console.log('value is ' + newValue)} />
        </div>
        <ListItem> <a href="#"> <div className="naav"> Home </div> </a> </ListItem>
       <ListItem>  <a href="#content" >  <div className="naav"> Content/Video </div> </a> </ListItem>
        <ListItem>   <a href="#store"> <div className="naav">
        <Icon iconName="Shop"  style={{ color: "gold"}}/>
          Store 
        </div></a> </ListItem>
                        
        
      </List>
      <Divider />
      <List>
        <ListItem>  <Select
          labelId="demo-controlled-open-select-label"
           id="demo-controlled-open-select"
           open={props.open}
           onClose={props.handleClose}
           onOpen={props.handleOpen}
           value={props.currency}
           onChange={props.handleChange}
           style={{backgroundColor: "transparent", color: "gold"}}
           >
           <MenuItem value="RWF">RWF</MenuItem>
           <MenuItem value="USD">USD</MenuItem>
        </Select> </ListItem>
        <ListItem> <a href="#contact" className="naav" >  <div>Contact us  </div> </a> </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {/* {(['left', 'right', 'top', 'bottom'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}> */}
          {/* <Button> </Button> */}
          <Icon iconName="CollapseMenu" className="menuIcon"   onClick={toggleDrawer('left', true)} />
          <Drawer anchor={'left'} open={state['left']}  onClose={toggleDrawer('left', false)}>
            {list("left")}
          </Drawer>
        {/* </React.Fragment>
      ))} */}
    </div>
  );
}
