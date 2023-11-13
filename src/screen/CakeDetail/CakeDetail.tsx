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
import { Button } from "@mui/material";
const CakeDetail =() =>{
    const {id} = useParams<string>()
    console.log(id)
    const [cake, setCake] = useState<ICake>()

    useEffect(() => {
        if(!id) return

        async function fetchData() {
            const data = await CakeService.FiltredCake(parseInt(id as string,10))
            setCake(data)
        }
        fetchData()

    }, [id]);

    if (!cake) return <p>Loading ...</p>

    return <>
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
                    
                </Toolbar>
            </Appbar>
            <Box>
            <Link to='/'><Button>Back</Button> </Link>
            </Box>
        <Grid container spacing={2} >
        <CakeItem cake={cake}/>
        </Grid>
        
    </>
}
export default CakeDetail