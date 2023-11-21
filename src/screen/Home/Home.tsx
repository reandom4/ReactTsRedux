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
import {alpha, IconButton, InputBase, styled, useMediaQuery } from "@mui/material";
import {useThem} from '../ThemeContext'
import {useNavigate } from "react-router-dom";
import { ICake } from "../../assets/types/cake.interface";
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import SearchCake from "./SearchCake";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


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


const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
  SearchCake({ setCakes, cakeName: event.target.value, n1:1,n2:2 })
  // Дополнительные действия при изменении значения ввода
};

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
                  <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange ={handleChange}
                  />
                  </Search>
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