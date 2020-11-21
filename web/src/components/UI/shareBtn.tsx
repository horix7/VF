/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import { HiOutlineShare } from "react-icons/hi";
import { IconContext } from "react-icons";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
      backgroundColor: "black",
      color: "gold",
    '&:focus': {
      backgroundColor:"gold",
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: "black",
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        

      <div onClick={handleClick}  style={{color: "white", backgroundColor: "black"}} >
      <IconContext.Provider value={{ color: "gold", className: "leftFloat" }} >
              <HiOutlineShare />
        </IconContext.Provider>
      </div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
       
      >
        <StyledMenuItem >
        <a style={{width: "100%", display: "grid" , gridTemplateColumns: "20% 80%", padding: "2px", columnGap: "5px"}} href={"https://www.facebook.com/sharer/sharer.php?u=" + props.link} target="_blank">
          <ListItemIcon>
            <FacebookIcon fontSize="small" style={{color: "white", backgroundColor: "blue"}} />
          </ListItemIcon>
          <ListItemText primary="facebook" />
        </a>
        </StyledMenuItem>
        <StyledMenuItem>
        <a style={{width: "100%", display: "grid" , gridTemplateColumns: "20% 80%", padding: "2px", columnGap: "5px"}} href={"https://twitter.com/share?url=" + encodeURIComponent(props.link) } target="_blank">
        
          <ListItemIcon>
            <TwitterIcon fontSize="small"  style={{color: "white", backgroundColor: "blue"}}  />
          </ListItemIcon>
          <ListItemText primary="twitter" />
          </a>
        </StyledMenuItem>
        <StyledMenuItem>
        <a style={{width: "100%", display: "grid" , gridTemplateColumns: "20% 80%", padding: "2px", columnGap: "5px"}} href= {"whatsapp://send?text=" + props.link}  data-action="share/whatsapp/share"  target="_blank"> 

          <ListItemIcon>
            <WhatsAppIcon fontSize="small"   style={{color: "white", backgroundColor: "green"}} />
          </ListItemIcon>
          <ListItemText primary="whatsapp" />
          </a>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
