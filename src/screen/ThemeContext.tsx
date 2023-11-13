import React, {createContext, useContext, useState, ReactNode} from 'react';


type ThemeContextProps = {
    isDarkTheme:boolean;
    toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextProps| undefined >(undefined);

type ThemeProviderProps = {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const toggleTheme = () => {
        setIsDarkTheme((prev) => !prev)
    }

    return (
        <ThemeContext.Provider value={{isDarkTheme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>

    );
};

export const useThem = () => {
    const context = useContext(ThemeContext);

    if(!context) {
        throw new Error('err');
    }

    return context;
}
    