import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ICake } from "../../assets/types/cake.interface";

const itemperpage = 3;
const serverip = '158.160.137.59:3001';



export default function db () {

}

export const getcount = async (val = "",setPageCount: React.Dispatch<React.SetStateAction<number>>) => {
    try {
      const response = await axios.get(serverip + `/countcakes/${val}`, {
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
      const response = await fetch(serverip +`/cakes/${id}`);
      if (!response.ok) {
        throw new Error('Торт не найден');
      }

      const data = await response.json();
      setCake(data);
    } catch (error) {
      console.error('Ошибка при получении данных о торте:');
    }
  };

export const addCake = (data:ICake) => {
  try {  
  fetch(serverip +'/addcakes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: data.name, image: data.image, price: data.price}),
    })
    }catch (error) {
      console.error('Ошибка при добовлении торта:');
      return false
    }
    return true
  };
  
export const update = (setCakes:(newCakes: (prev: ICake[]) => ICake[]) => void) => {
  fetch(serverip +'/cakes')
  .then((response) => response.json())
  .then((updatedData) => setCakes(updatedData))
  .catch((error) => console.error('Ошибка при получении тортов:', error));
}

export const delCake = async (setCakes:React.Dispatch<React.SetStateAction<ICake[]>>,id:number) => {
    try {
      const response = await axios.delete(serverip +`/cakes/${id}`);
  
      if (response.status === 200) {
        console.log(setCakes);
        fetch(serverip +'/cakes')
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

export const login = async (uname:string, pass:string) => {
    try {
      const response = await axios.post(serverip +'/login', {
        username: uname,
        password: pass
      });
      const { token } = response.data;
      localStorage.setItem('token',token);
      return true
    } catch (error) {
      return false
    }
  };

export const register = async (uname:string, pass:string) => {
    if (!isValidEmail(uname))
    {
        return false
    }
        fetch(serverip +'/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: uname, password: pass}),
          })
            .then((response) => response.json())
            .catch(error => {console.error('Ошибка при добавлении пользователя:', error);
            return false
        })
        return true
  };

function isValidEmail(email: string| null) {
  if (email === null) {
      return false;
  }
  return /\S+@\S+\.\S+/.test(email);
};

export const searchCake = async (setCakes: React.Dispatch<React.SetStateAction<ICake[]>>,cakeName:string,limit:number,offset:number) => {
    
  const fetchData = async () => {
  try {
      const response = await axios.get(serverip +`/searchcakes/${cakeName}`, {
          params: {
              cakename: cakeName,
              limit: limit,
              offset: (offset -1) * 3 
            },
      });
      setCakes (response.data)
    } catch (error) {
      console.error('Login failed:', (error as any).response.data.error);
      return null
    }
  }

  fetchData()
}