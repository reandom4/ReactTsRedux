import CakeItem from "../Home/CakeItem";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {ICake} from "../../assets/types/cake.interface";
import { CakeService } from "./cake.service";
import Appbar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LeftMenu } from "../Home/LeftMenu";
import { Box, Button } from "@mui/material";
import { ColorModeContext, ThemeButton } from "../Home/Home";
import React from 'react';
import {useThem} from '../ThemeContext'



const CakeDetail =() =>{
    const {id} = useParams<string>()
    const [cake, setCake] = useState<ICake>()
    const defaultTheme = createTheme();
    const {isDarkTheme, toggleTheme} = useThem();
    const [mode, setMode] = React.useState<'light' | 'dark'>(isDarkTheme? 'dark' : 'dark');
    

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
        if(!id) return

        async function fetchData() {
            const data = await CakeService.FiltredCake(parseInt(id as string,10))
            setCake(data)
        }
        fetchData()

    }, [id]);

    if (!cake) return <p>Loading ...</p>
    console.log(defaultTheme)
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
            <Box sx ={{bgcolor: 'background.default',width: '100%'}}>
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