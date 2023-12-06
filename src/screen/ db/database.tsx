import axios from "axios";
import React from "react";
import { ICake } from "../../assets/types/cake.interface";

const itemperpage = 3;

export default function db () {

}

export const getcount = async (val = "",setPageCount: React.Dispatch<React.SetStateAction<number>>) => {
    try {
      const response = await axios.get(`http://158.160.131.177:3001/countcakes/${val}`, {
        params: {
          cakename: val
        },
      });
      const pages = response.data['count(*)']
      const pagecount = Math.ceil(pages / itemperpage)
      setPageCount(pagecount);
    } catch (error) {
      console.error('Ошибка при загрузке тортов:', (error as any).message);
    }
  };

export const fetchCakeDetails = async (setCake:React.Dispatch<React.SetStateAction<ICake | undefined>>, id:string | undefined) => {
    try {
      const response = await fetch(`http://158.160.131.177:3001/cakes/${id}`);
      if (!response.ok) {
        throw new Error('Торт не найден');
      }

      const data = await response.json();
      setCake(data);
    } catch (error) {
      console.error('Ошибка при получении данных о торте:');
    }
  };

export const delCake = async (setCakes: React.Dispatch<React.SetStateAction<ICake[]>> ,id:number) => {
    try {
      const response = await axios.delete(`http://158.160.131.177:3001/cakes/${id}`);
  
      if (response.status === 200) {
        console.log(setCakes);
        fetch('http://localhost:3001/cakes')
          .then((response) => response.json())
          .then((updatedData) => setCakes(updatedData))
          .catch((error) => console.error('Ошибка при получении тортов:', error));
        // Дополнительные действия после успешного удаления
      } else {
        console.error('Ошибка при удалении торта:', response.data.error);
      }
    } catch (error) {
      console.error('Ошибка при удалении торта:', (error as any).message);
    }
      
  };