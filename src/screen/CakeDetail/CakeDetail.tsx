import CakeItem from "../Home/CakeItem";
import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {ICake} from "../../assets/types/cake.interface";
import {AppBar,CssBaseline,Grid,Toolbar,Typography,Box, Button,createTheme,ThemeProvider} from '@mui/material';
import { ColorModeContext } from "../Home/Home";
import {ThemeButton, useThemeUtils } from "../ui/themeUtils";
import { fetchCakeDetails } from "../ db/database";

const CakeDetail =() =>{
    const {id} = useParams<string>()
    const [cake, setCake] = useState<ICake>()
    const [, setCakes] = useState<ICake[]>([]);
    const defaultTheme = createTheme();

    const { theme, colorMode, toggleTheme } = useThemeUtils();
    fetchCakeDetails(setCake,id);
    
    if (!cake) return <p>Loading ...</p>

    return (
    <>
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
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
                          <ThemeButton toggleTheme={toggleTheme}/>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx ={{bgcolor: 'background.default',minHeight: '100vh'}}>
                    <Box>
                        <Link to='/Cake'><Button>Back</Button> </Link>
                    </Box>
                    <Grid container spacing={2} >
                        <CakeItem cake={cake} setCakes={setCakes}/>
                    </Grid>
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    </ThemeProvider>
    </>
    )
}
export default CakeDetail