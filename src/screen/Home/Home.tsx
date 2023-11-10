import {cakes as cakeData} from "./Cake.data";
import {useState} from "react";
import CakeItem from './CakeItem'
import AddCakeForm from "./AddCakeForm";
import Appbar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LeftMenu } from "./LeftMenu";

import AddIcon from '@mui/icons-material/Add';



function Copyright() {
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

const Home = () => {

    const [cake,setCake] = useState(cakeData)

    const defaultTheme = createTheme();
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Appbar position="relative">
                <Toolbar>
                    <LeftMenu setCake={setCake}/>
                    <Typography variant="h6" color="inherit" noWrap>
                        Cake cataloge
                    </Typography>
                </Toolbar>
            </Appbar>
            <Box sx={{ ml: 4 , py: 2}}>
            <AddCakeForm  setCake={setCake}/>
            </Box>
            <Box sx={{ ml: 4 , py: 2}}>
            <Grid container spacing={4}>
                {cake.length? (cake.map(cake => <CakeItem key = {cake.id} cake={cake}/>
                ))
                : <p>there are no cakes</p>
                }
            </Grid>
            </Box>

            </ThemeProvider>
        

        </>
    )
              }

export default Home