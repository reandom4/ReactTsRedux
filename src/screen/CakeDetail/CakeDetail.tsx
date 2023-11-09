import CakeItem from "../Home/CakeItem";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {ICake} from "../../assets/types/cake.interface";
import { CakeService } from "./cake.service";
const CakeDetail =() =>{
    const {id} = useParams<string>()
    console.log(id)
    const [cake, setCake] = useState<ICake>()

    useEffect(() => {
        if(!id) return

        async function fetchData() {
            const data = await CakeService.FiltredCake(parseInt(id as string,10))
            setCake(data)
        }
        fetchData()

    }, [id]);

    if (!cake) return <p>Loading ...</p>

    return <>
        <Link to='/'>Back</Link>
        <CakeItem cake={cake}/>
    </>
}
export default CakeDetail