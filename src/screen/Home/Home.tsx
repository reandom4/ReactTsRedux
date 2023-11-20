import {cakes as cakeData} from "./Cake.data";
import {useEffect, useState} from "react";
import CakeItem from './CakeItem'
import AddCakeForm from "./AddCakeForm";
import Appbar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { LeftMenu } from "./LeftMenu";
import {useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {IconButton, useMediaQuery } from "@mui/material";
import {useThem} from '../ThemeContext'
import {useNavigate } from "react-router-dom";
import { ICake } from "../../assets/types/cake.interface";
import axios from 'axios';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


const Home = () => {

  const defaultTheme = createTheme();
  const {isDarkTheme, toggleTheme} = useThem();
  const [mode, setMode] = React.useState<'light' | 'dark'>(isDarkTheme? 'dark' : 'light');



  const [cakes, setCakes] = useState<ICake[]>([]);

  const fetchCakes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/cakes');
      setCakes(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке тортов:', (error as any).message);
    }
  };

  useEffect(() => {
    fetchCakes()
  }, []);
  


  function ThemeButton() 
  {
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
    

  return (
      <>
          <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <ColorModeContext.Provider value={colorMode}>
                      <ThemeProvider theme={theme}>
          <Appbar position="static">
              <Toolbar>
                  
                  <LeftMenu setCake={setCakes}/>
                  <Typography variant="h6" 
                  color="inherit" 
                  noWrap 
                  component="div" 
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                  >
                      Cake cataloge
                  </Typography>
                  
                  <Box sx={{flexGrow:0}}>
                    <AddCakeForm  setCake={setCakes}/>
                  </Box>
                  <Box>
                    <ThemeButton />
                  </Box>
              </Toolbar>
          </Appbar>

          <Box sx ={{bgcolor: 'background.default'}}>
          <Box sx={{ ml: 4 , py: 2, bgcolor: 'background.default', width: '100%',
            color: 'text.primary' } }>
          <Grid container spacing={4}>
            {cakes.length? (cakes.map(cake => <CakeItem key = {cake.id} cake={cake} setCakes={setCakes} />
            ))
            : <p>Loading....</p>
            }
          </Grid>
          </Box>
          </Box>
          </ThemeProvider>
          </ColorModeContext.Provider>

          </ThemeProvider>
      </>
  )
}
export default Home