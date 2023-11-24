import * as React from 'react';
import { useEffect, useState } from "react";

import { ICake } from "../../assets/types/cake.interface";
import CakeItem from '../Home/CakeItem';
import { LeftMenu } from "../Home/LeftMenu";
import Appbar from '@mui/material/AppBar';
import {Box, Grid, CssBaseline, Toolbar,Typography, ThemeProvider, createTheme } from '@mui/material';
import {ThemeButton, useThemeUtils } from '../ui/themeUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Follow = () => {

  const defaultTheme = createTheme();
  const [cakes, setCakes] = useState<ICake[]>([]);

  const { theme, colorMode, toggleTheme } = useThemeUtils();
  const favorites = useSelector((state:RootState) => state.favorites)
  useEffect(() => {
    setCakes(() => [
        ...favorites
    ]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Appbar position="static">
              <Toolbar>
                <LeftMenu />
                <Typography variant="h6"
                  color="inherit"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  Follow
                </Typography>
                
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
            </Box>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ThemeProvider>
    </>
  )
}
export default Follow 