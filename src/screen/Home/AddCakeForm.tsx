import React, {useState} from "react";
import {ICake} from "../../assets/types/cake.interface";
import {useForm} from "react-hook-form";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
    const [newCakeName, setNewCakeName] = useState('');
    const [newCakePrice, setNewCakePrice] = useState<number>(0);
    const [cakes, setCakes] = useState<ICake[]>([]);

    const addCake = () => {
      if (newCakeName === undefined || newCakePrice === undefined) {
        console.error('Name or price is undefined');
        return;
      }
      fetch('/api/cakes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCakeName, price: newCakePrice }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Обновляем список тортов после добавления нового
          fetch('/api/cakes')
            .then((response) => response.json())
            .then((updatedData) => setCakes(updatedData))
            .catch((error) => console.error('Ошибка при получении тортов:', error));
        })
        .catch((error) => console.error('Ошибка при добавлении торта:', error));
    };


    const createCake = (data:ICake) => {
        console.log(data)
            setCake((prev:ICake[]) => [
                {
                    id: prev.length + 1,
                    name: data.name,
                    price: data.price,
                    image: data.image

                },
                ...prev
            ]);
            setNewCakeName(data.name)
            setNewCakePrice(data.price)
            addCake()
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