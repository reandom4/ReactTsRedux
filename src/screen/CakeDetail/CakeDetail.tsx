import CakeItem from "../Home/CakeItem";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ICake} from "../../assets/types/cake.interface";
import { CakeService } from "./cake.service";
import Appbar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LeftMenu } from "../Home/LeftMenu";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { ColorModeContext } from "../Home/Home";
import React from 'react';
import {useThem} from '../ThemeContext'

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const CakeDetail =() =>{
    const {id} = useParams<string>()
    const [cake, setCake] = useState<ICake>()
    const defaultTheme = createTheme();
    const {isDarkTheme, toggleTheme} = useThem();
    const [mode, setMode] = React.useState<'light' | 'dark'>(isDarkTheme? 'dark' : 'light');
    const navigate = useNavigate()
    
    function ThemeButton() {
      const theme = useTheme();
      const colorMode = React.useContext(ColorModeContext);
      return (
        <Box>
          <IconButton sx={{ ml: 1 }} onClick={() => { colorMode.toggleColorMode(); toggleTheme(); }}  color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      );
    }

    useEffect(() => {
      const fetchCakeDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3001/cakes/${id}`);
          if (!response.ok) {
            throw new Error('Торт не найден');
          }
  
          const data = await response.json();
          setCake(data);
        } catch (error) {
          console.error('Ошибка при получении данных о торте:');
        }
      };
  
      fetchCakeDetails();
    }, [id]);
    
    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          console.log(isDarkTheme);
          setMode(isDarkTheme ? 'light' : 'dark');
        },
      }),
      [isDarkTheme,],
    );

    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            mode,
          },
        }),
      [mode],
    );

    useEffect(() => {
      
      const isAuthenticated:string | null = localStorage.getItem('isAuthenticated')

      if (isAuthenticated !== 'true') {
        navigate('/') 
      }

    },[])

    if (!cake) return <p>Loading ...</p>
    return <>
    <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
    <Appbar position="static">
                <Toolbar>
                    <Typography variant="h6" 
                    color="inherit" 
                    noWrap 
                    component="div" 
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Cake cataloge
                    </Typography>
                    <Box>
                          <ThemeButton />
                    </Box>
                </Toolbar>
            </Appbar>
            <Box sx ={{bgcolor: 'background.default',minHeight: '100vh'}}>
            <Box>
            <Link to='/'><Button>Back</Button> </Link>
            </Box>
        
        <Grid container spacing={2} >
        <CakeItem cake={cake}/>
        </Grid>
        </Box>
        </ThemeProvider>
            </ColorModeContext.Provider>
    </ThemeProvider>
    </>
}
export default CakeDetail