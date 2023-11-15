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
import Link from '@mui/material/Link';
import * as React from 'react';
import { LeftMenu } from "./LeftMenu";
import {useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {IconButton, useMediaQuery } from "@mui/material";
import {useThem} from '../ThemeContext'
import {useNavigate } from "react-router-dom";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });




export function Copyright() {
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

  export function ThemeButton() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
      <Box>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    );
  }

  interface Cake {
    id: number;
    name: string;
    photo: string;
    price: number;
  }


const Home = () => {

  const [cake,setCake] = useState(cakeData);
  const defaultTheme = createTheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const {isDarkTheme, toggleTheme} = useThem();
  const [mode, setMode] = React.useState<'light' | 'dark'>(isDarkTheme? 'dark' : 'light');
  const navigate = useNavigate()


  const [cakes, setCakes] = useState<Cake[]>([]);
  useEffect(() => {
    fetch('/api/cakes') // Обращаемся к нашему API
      .then((response) => response.json())
      .then((data) => setCakes(data))
      .catch((error) => console.error('Ошибка при получении тортов:', error));
  }, []);
  console.log(cakes)

  

  useEffect(() => {
    
    const isAuthenticated:string | null = localStorage.getItem('isAuthenticated')

    if (isAuthenticated !== 'true') {
      navigate('/') 
    }

   },[])


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
                  
                  <LeftMenu setCake={setCake}/>
                  <Typography variant="h6" 
                  color="inherit" 
                  noWrap 
                  component="div" 
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                  >
                      Cake cataloge
                  </Typography>
                  
                  <Box sx={{flexGrow:0}}>
                    <AddCakeForm  setCake={setCake}/>
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
            {cake.length? (cake.map(cake => <CakeItem key = {cake.id} cake={cake}/>
            ))
            : <p>there are no cakes</p>
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