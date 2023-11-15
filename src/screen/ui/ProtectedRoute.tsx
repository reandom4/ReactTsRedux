import { useState, useEffect } from "react";
import { Route,  Navigate} from "react-router-dom";

interface ProtectedRouteProps {
    path: string;
    element:React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({path,element}) => {

    const [isAuthenticated, setisAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        
        const isAuthenticated:string | null = localStorage.getItem('isAuthenticated')
    
        if (isAuthenticated !== 'true') {
            setisAuthenticated(true);
        }
    
       },[])
    return ( 
      <Route path={path} element={isAuthenticated? element: <Navigate to="/"/>}/>
    );
};

export default ProtectedRoute;