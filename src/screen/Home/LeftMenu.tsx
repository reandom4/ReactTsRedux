import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';

type Anchor = 'left';

const [state, setState] = React.useState({
    left: false,
  });
  
  

export const  LeftMenu = () => {

    
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
                <ListItemButton>
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
                <ListItemButton>
                  <ListItemIcon>
                    {<FavoriteBorderIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={'Show all'} />
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



