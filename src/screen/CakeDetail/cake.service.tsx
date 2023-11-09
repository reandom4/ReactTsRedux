import {cakes} from '../Home/Cake.data'

export const CakeService = {
    async FiltredCake(id:number) {
        const cakeWithId = await cakes.find(cake => cake.id === id);
        return cakeWithId

    },
}