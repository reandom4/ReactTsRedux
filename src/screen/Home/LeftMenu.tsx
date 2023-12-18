import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

type Anchor = 'left';


export function  LeftMenu  ()  {

  const navigate = useNavigate()

    const [state, setState] = React.useState({
        left: false,
      });
    
    const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };
    
    const showfollow = () => {
      navigate("/Cake/Follow")   
    }

    const showAll = async () => {
      navigate("/Cake")   
    }

    const back = () => {
      navigate('/') 
      localStorage.setItem('isAuthenticated','false');
      localStorage.setItem('token', '');
    }

      const list = () => (
        <Box
          sx={{'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}
        >
          <List>
            { 
              <ListItem disablePadding>
                <ListItemButton onClick={showfollow}>
                  <ListItemIcon>
                    {<FavoriteIcon />}
                  </ListItemIcon>
                  <ListItemText primary={'Show follow'} />
                </ListItemButton>
              </ListItem>         
            }
          </List>
          <List>
            { 
              <ListItem disablePadding>
                <ListItemButton onClick={showAll}>
                  <ListItemIcon>
                    {<FavoriteBorderIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={'Show all'} />
                </ListItemButton>
              </ListItem>         
            }
          </List>
          <List>
            { 
              <ListItem disablePadding>
                <ListItemButton onClick={back}>
                  <ListItemIcon>
                    {<LogoutIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={'Log out'} />
                </ListItemButton>
              </ListItem>         
            }
          </List>
        </Box>
      );

      return(
          <> 
            <IconButton
                 color="inherit"
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={toggleDrawer('left', true)}
                  
                > 
                <MenuIcon/> 
            </IconButton>
                <Drawer
                  anchor={'left'}
                  open={state['left']}
                  onClose={toggleDrawer('left', false)}
                >   
            {list()}
          </Drawer>
          </>
      )

      
}



