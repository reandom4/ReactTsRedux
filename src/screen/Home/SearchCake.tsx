import axios from "axios";
import { ICake } from "../../assets/types/cake.interface";

interface CakeSearchProps {
    setCakes: React.Dispatch<React.SetStateAction<ICake[]>>;
    cakeName: string;
    n1: number;
    n2: number;
}

function SearchCake({setCakes,cakeName,n1,n2}:CakeSearchProps) {
    
    const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/searchcakes/${cakeName}`, {
            
        });
        setCakes(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Login failed:', (error as any).response.data.error);
      }
    }

    fetchData()
}

export default SearchCake