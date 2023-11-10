import {cakes as cakeData} from "./Cake.data";
import React, {useState} from "react";
import CakeItem from './CakeItem'
import AddCakeForm from "./AddCakeForm";
import Appbar from '@mui/material/AppBar';
<<<<<<< Updated upstream
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
=======
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
>>>>>>> Stashed changes
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItem } from "@mui/material";



function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

type Anchor = 'left';

const Home = () => {

  
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

  const list = (anchor: Anchor) => (
    <Box
      sx={{'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
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

    const [cars,setCake] = useState(cakeData)

    const defaultTheme = createTheme();
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Appbar position="relative">
                <Toolbar>
<<<<<<< Updated upstream
                    <CameraIcon sx={{ mr: 2 }} />
=======
                
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
            {list('left')}
          </Drawer>
       
                
                
>>>>>>> Stashed changes
                    <Typography variant="h6" color="inherit" noWrap>
                        Cake cataloge
                    </Typography>
                </Toolbar>
            </Appbar>
            <Box sx={{ ml: 4 , py: 2}}>
            <AddCakeForm  setCake={setCake}/>
            </Box>



            <Box sx={{ ml: 4 , py: 2}}>
            <Grid container spacing={4}>
                {cars.length? (cars.map(cake => <CakeItem key = {cake.id} cake={cake}/>
                ))
                : <p>there are no cakes</p>
                }
            </Grid>
            </Box>

            </ThemeProvider>
        

        </>
    )
              }

export default Home