import * as React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';

import { ICake } from "../../assets/types/cake.interface";
import CakeItem from './CakeItem';
import AddCakeForm from "./AddCakeForm";
import SearchCake from "./SearchCake";
import { LeftMenu } from "./LeftMenu";
import { useThem } from '../ThemeContext';

import Appbar from '@mui/material/AppBar';
import {Box, Grid, CssBaseline, Toolbar,Typography, alpha, IconButton, InputBase, Stack, styled, Pagination} from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';


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
  const { isDarkTheme, toggleTheme } = useThem();
  const [mode, setMode] = React.useState<'light' | 'dark'>(isDarkTheme ? 'dark' : 'light');

  const [cakes, setCakes] = useState<ICake[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const itemperpage = 3;

  const fetchCakes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/cakes', {
        params: {
          limit: itemperpage,
          offset: (page - 1) * 3,
        },
      });
      setCakes(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке тортов:', (error as any).message);
    }
  };

  const getcount = async (val = "") => {
    try {
      const response = await axios.get(`http://localhost:3001/countcakes/${val}`, {
        params: {
          cakename: val
        },
      });
      const pages = response.data['count(*)']
      const pagecount = Math.ceil(pages / itemperpage)
      setPageCount(pagecount);
    } catch (error) {
      console.error('Ошибка при загрузке тортов:', (error as any).message);
    }
  };

  useEffect(() => {
    fetchCakes()
    getcount()
    // eslint-disable-next-line
  }, [page]);

  function ThemeButton() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
      <Box>
        <IconButton sx={{ ml: 1 }} onClick={() => { colorMode.toggleColorMode(); toggleTheme(); }} color="inherit">
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
    [isDarkTheme],
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

  const onPageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SearchCake({ setCakes, cakeName: event.target.value, limit: itemperpage, offset: (page - 1) * 3 })
    console.log(event.target)
    getcount(event.target.value)
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Appbar position="static">
              <Toolbar>

                <LeftMenu setCake={setCakes} />
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
                    onChange={handleChange}
                  />
                </Search>
                <Box sx={{ flexGrow: 0 }}>
                  <AddCakeForm setCake={setCakes} />
                </Box>
                <Box>
                  <ThemeButton />
                </Box>
              </Toolbar>
            </Appbar>
            <Box sx={{ bgcolor: 'background.default', minHeight:'91vh'}}>
              <Box sx={{ bgcolor: 'background.default' }}>
                <Box sx={{ pl: 4, pr: 4, py: 2, bgcolor: 'background.default', width: '100%', color: 'text.primary' }}>
                  <Grid container spacing={3}>
                    {cakes.length ? (
                      cakes.map(cake => <CakeItem key={cake.id} cake={cake} setCakes={setCakes} />)
                    ) : (
                      <p></p>
                    )}
                  </Grid>
                </Box>
              </Box>
              <Stack alignItems="center">
                <Pagination count={pageCount} variant="outlined" color="secondary" onChange={(e, newpage) => onPageChange(e, newpage)} />
              </Stack>
            </Box>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ThemeProvider>
    </>
  )
}
export default Home 