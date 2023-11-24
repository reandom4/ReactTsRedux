import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState, ReactElement } from "react";
import Home from "../Home/Home";
import CakeDetail from "../CakeDetail/CakeDetail";
import SignIn from "../SignIn/SignIn";
import SignUp from "../Signup/SignUp";
import Follow from "../Follow/Follow"

interface PrivateRouteProps {
  element: ReactElement;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAuthenticated }) => {
    const token = localStorage.getItem('token');
    if (token) {
      return element
    }
    return isAuthenticated ? element : <SignIn />;
};

const Router = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Здесь можно добавить логику проверки наличия токена в localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/registration' element={<SignUp/>}/>
        <Route
          path='/cake'
          element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/cake/:id'
          element={<PrivateRoute element={<CakeDetail />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/cake/follow'
          element={<PrivateRoute element={<Follow />} isAuthenticated={isAuthenticated} />}
        />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;