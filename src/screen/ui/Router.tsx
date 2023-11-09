import {BrowserRouter,  Route, Routes} from "react-router-dom";
import Home from "../Home/Home"
import CakeDetail from "../CakeDetail/CakeDetail"
const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<Home />} path='/'/>
            <Route element={<CakeDetail />} path='/cake/:id'/>
            <Route path='*' element={<div>Not Found</div>}/>
        </Routes>
    </BrowserRouter>
}
export default Router