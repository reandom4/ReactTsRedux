import axios from "axios";
import React from "react";
import { ICake } from "../../assets/types/cake.interface";

const itemperpage = 3;

export default function db () {

}

export const getcount = async (val = "",setPageCount: React.Dispatch<React.SetStateAction<number>>) => {
    try {
      const response = await axios.get(`http://localhost:3001/countcakes/${val}`, {
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
      const response = await fetch(`http://localhost:3001/cakes/${id}`);
      if (!response.ok) {
        throw new Error('Торт не найден');
      }

      const data = await response.json();
      setCake(data);
    } catch (error) {
      console.error('Ошибка при получении данных о торте:');
    }
  };