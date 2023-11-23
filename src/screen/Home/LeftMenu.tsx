import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';
import { ICake } from "../../assets/types/cake.interface";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";

type Anchor = 'left';


export function  LeftMenu  ({setCake,setPageCount,setPage}:{setPage:(newPage:(prev:number)=> number) => void, setPageCount:(newPage:(prev:number)=> number) => void, setCake: (newCakes: (prev: ICake[]) => ICake[]) => void})  {

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

    interface RootState {
        favorites: ICake[]
      }

    const [data,setData] = React.useState<ICake[] | null>(null)

    const favorites = useSelector((state:RootState) => state.favorites)
    
    let isExist = false;
    
    
    const showfollow = () => {
        
        setCake(() => [
            ...favorites
        ]);
        setPageCount(() => Math.ceil(favorites.length / 3))
        
    }

    const showAll = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/countcakes`, {
        });
        const pages = response.data['count(*)']
        const pagecount = Math.ceil(pages / 3)
        setPageCount(() => pagecount);
      } catch (error) {
        console.error('Ошибка при загрузке тортов:', (error as any).message);
      }
        fetch('http://localhost:3001/cakes') // Обращаемся к нашему API
          .then((response) => response.json())
          .then((data) => setCake(data))
          .catch((error) => console.error('Ошибка при получении тортов:', error));

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



