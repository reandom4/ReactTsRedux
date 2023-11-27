import React from 'react';
import { createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, Box, useTheme } from '@mui/material';
import { ColorModeContext } from '../Home/Home';
import { useThem } from '../ThemeContext';




interface ThemeButtonProps {
  toggleTheme: () => void;
}

export const ThemeButton: React.FC<ThemeButtonProps> = ({ toggleTheme }) => {
  
  const theme = useTheme();

  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box>
      <IconButton sx={{ ml: 1 }} onClick={() => { colorMode.toggleColorMode(); toggleTheme(); }} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};


export const useThemeUtils = () => {
  const { isDarkTheme, toggleTheme } = useThem(); // Assuming this is correctly imported and defined
  const [mode, setMode] = React.useState<'light' | 'dark'>(() => isDarkTheme ? 'dark' : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
      },
    }),
    [],
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

  console.log(mode)

  return { theme, colorMode, toggleTheme };
};
