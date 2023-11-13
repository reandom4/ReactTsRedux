import {ICake} from "../../assets/types/cake.interface";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/favorites/favorites.slise";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';





interface CakeItemProps {
    cake: ICake;
}

interface RootState {
  favorites: ICake[]
}
function CakeItem({cake}:CakeItemProps){

    
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
                    <Button size="small"onClick={()=> dispatch(actions.toggleFavorites(cake))}>{isExist? <FavoriteIcon/>: <FavoriteBorderIcon/>} </Button>
                  </CardActions>        
            </Card>
        </Grid>
    )
}
export default CakeItem