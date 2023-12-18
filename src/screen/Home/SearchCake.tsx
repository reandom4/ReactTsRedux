import axios from "axios";
import { ICake } from "../../assets/types/cake.interface";
import {searchCake} from "../ db/database"

interface CakeSearchProps {
    setCakes: React.Dispatch<React.SetStateAction<ICake[]>>;
    cakeName: string;
    limit: number;
    offset: number;
}

function SearchCake({setCakes,cakeName,limit,offset}:CakeSearchProps) {
    
    const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/searchcakes/${cakeName}`, {
            params: {
                cakename: cakeName,
                limit: limit,
                offset: (offset -1) * 3 
              },
        });
        setCakes(response.data)
      } catch (error) {
        console.error('Login failed:', (error as any).response.data.error);
      }
    }

    fetchData()
}

export default SearchCake