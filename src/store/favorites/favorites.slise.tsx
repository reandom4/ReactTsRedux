import { createSlice } from "@reduxjs/toolkit";
import { ICake } from "../../assets/types/cake.interface";
const initialState:ICake[] = []

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers:{
        toggleFavorites: (state,{payload: cake}) =>{
            const isExist = state.some(r => r.id === cake.id )

            if(isExist){
                const index = state.findIndex(item => item.id === cake.id )
                if(index !== -1)
                {
                    state.splice(index,1)
                }
            }
            else
                state.push(cake)

        }
    }
})

export const {actions,reducer} = favoritesSlice