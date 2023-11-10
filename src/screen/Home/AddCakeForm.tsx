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


function AddCakeForm({setCake}:{setCake: (newCakes: (prev: ICake[]) => ICake[]) => void}) {
    
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
                    price: data.price, // Преобразовать строку в число
                    image: data.image,
                },
                ...prev
            ]);
        reset()
    }
    return(
        <>
        <form onSubmit={handleSubmit(createCake)}>
        <Grid item xs={12} sm={6}>
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
        <Button color="inherit" onClick={handleSubmit(createCake)} >Create</Button>
        
        </form>
        </>
    )
}
export default AddCakeForm