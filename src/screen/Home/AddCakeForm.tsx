import React from "react";
import {ICake} from "../../assets/types/cake.interface";
import {useForm} from "react-hook-form";
import {addCake,update} from "../ db/database"

import { IconButton,Dialog,DialogActions,DialogContent,DialogTitle,TextField,Grid,Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';



function AddCakeForm({setCake}:{setCake: (newCakes: (prev: ICake[]) => ICake[]) => void}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    
    const {register,handleSubmit,reset} = useForm<ICake>({
        mode: 'onChange'
    })

    const addCakes = (data:ICake) => {
      if (addCake(data))
      {
        update(setCake)
      }
      reset()
    };

    return(
        <>
        <IconButton
        color="inherit"
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        sx={{ p: 0 }} 
        onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>

        <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Добавление тортов</DialogTitle>
        <DialogContent>
          
        <form onSubmit={handleSubmit(addCakes)} >
        <Grid item xs={12} sm={6} sx={{width:350}}>
          <TextField
            required
            id="name"
            label="Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            {...register('name',{required: 'Name is required'})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="price"
            label="Price"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            {...register('price',{required: 'Name is required'})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="image"
            label="Image"
            fullWidth
            autoComplete="given-name"
            variant="standard" 
            {...register('image',{required: 'Name is required'})}
          />
        </Grid>
        <DialogActions>
          <Button onClick={handleSubmit(addCakes)}>Add</Button>
        </DialogActions>
        </form>
        </DialogContent>
        
      </Dialog>
        
        </>
    )
}
export default AddCakeForm