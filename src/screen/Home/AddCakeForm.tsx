import React, {useState} from "react";
import {ICake} from "../../assets/types/cake.interface";
import {inspect} from "util";
import styles from "./AddCakeForm.module.css"
import {useForm} from "react-hook-form";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AddCakeForm({setCake}:{setCake: (newCakes: (prev: ICake[]) => ICake[]) => void}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    const {register,handleSubmit,reset, formState: {errors}} = useForm<ICake>({
        mode: 'onChange'
    })
    const [data,setData] = useState<ICake | null>(null)

    const createCake = (data:ICake) => {
        console.log(data)
            setCake((prev:ICake[]) => [
                {
                    id: prev.length + 1,
                    name: data.name,
                    price: data.price,
                    image: data.image,
                },
                ...prev
            ]);
        reset()
    }
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
          
        <form onSubmit={handleSubmit(createCake)} >
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
          <Button onClick={handleSubmit(createCake)}>Add</Button>
        </DialogActions>
        </form>
        </DialogContent>
        
      </Dialog>
        
        </>
    )
}
export default AddCakeForm