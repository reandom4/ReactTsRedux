import {ICake} from "../../assets/types/cake.interface";
import {Link} from "react-router-dom";
import { delCake } from "../ db/database";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/favorites/favorites.slise";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {CardActions, CardContent, CardMedia, Grid, Typography,Box,Card,Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


interface CakeItemProps {
    cake: ICake;
    setCakes: React.Dispatch<React.SetStateAction<ICake[]>> 
}

interface RootState {
  favorites: ICake[]
}

function CakeItem({cake,setCakes}:CakeItemProps){
    const favorites = useSelector((state:RootState) => state.favorites)
    const dispatch = useDispatch()
    const isExist = favorites.some((r: { id: number; }) => r.id === cake.id)

    return(
        <Grid item key={cake.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
              component="div"
                sx={{
                  // 16:9
                  pt: '56.25%',
                }}
                image={cake.image}
              />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {cake.name}
                  </Typography>   
                  <Typography component="h2" variant="h3" color="text.primary">
                    {cake.price}₽
                  </Typography>
                </CardContent>
                  
                <CardActions>
                  <Link to={`/cake/${cake.id}`}><Button size="small">Read More</Button></Link>
                  <Button size="small" sx={{flexGrow:0}} onClick={()=> dispatch(actions.toggleFavorites(cake))}>{isExist? <FavoriteIcon/>: <FavoriteBorderIcon/>} </Button>
                  <Box sx={{flexGrow:1}}>
                  </Box>
                  <Button size="small" sx={{flexGrow:0}} onClick={() => delCake(setCakes,cake.id)}> <DeleteIcon/> </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
export default CakeItem