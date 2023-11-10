import {cakes as cakeData} from "./Cake.data";
import React, {useState} from "react";
import CakeItem from './CakeItem'
import styles from './HomePage.module.css'
import AddCakeForm from "./AddCakeForm";

import Appbar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import CakeIcon from '@mui/icons-material/Cake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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


const Home = () => {
    const [cars,setCake] = useState(cakeData)

    const defaultTheme = createTheme();
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Appbar position="relative">
                <Toolbar>
                    <CakeIcon sx={{ mr: 2 }} />
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