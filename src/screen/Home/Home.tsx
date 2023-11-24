import * as React from 'react';
import { useEffect, useState } from "react";

import { ICake } from "../../assets/types/cake.interface";
import CakeItem from './CakeItem';
import AddCakeForm from "./AddCakeForm";
import SearchCake from "./SearchCake";
import { LeftMenu } from "./LeftMenu";
import { getcount } from '../ db/database'

import Appbar from '@mui/material/AppBar';
import {Box, Grid, CssBaseline, Toolbar,Typography, alpha, InputBase, Stack, styled, Pagination, ThemeProvider, createTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {ThemeButton, useThemeUtils } from '../ui/themeUtils';


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
  const [cakes, setCakes] = useState<ICake[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [cakeName, setCakeName] = useState<string>('');
  const itemperpage = 3;

  const { theme, colorMode, toggleTheme } = useThemeUtils();

  useEffect(() => {
    SearchCake({ setCakes, cakeName: cakeName, limit: itemperpage, offset: page})
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    getcount('',setPageCount)
    // eslint-disable-next-line
  }, []);

  const onPageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    SearchCake({ setCakes, cakeName: event.target.value, limit: itemperpage, offset: page })
    setCakeName(event.target.value)
    getcount(event.target.value,setPageCount)
    setPage(1)
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Appbar position="static">
              <Toolbar>
                <LeftMenu setCake={setCakes} setPageCount={setPageCount} setPage={setPage}/>
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
                  <ThemeButton toggleTheme={toggleTheme}/>
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
                <Pagination page={page} count={pageCount} variant="outlined" color="secondary" onChange={(e, newpage) => onPageChange(e, newpage)} />
              </Stack>
            </Box>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ThemeProvider>
    </>
  )
}
export default Home 