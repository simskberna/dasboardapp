import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useLogin = ({email,password}) => {
   
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async() => {
        setIsLoading(true);
        setError(null); 
        try {
            const json = {email,password};
 
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            localStorage.setItem('user', JSON.stringify(json.email));
            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    return { login, isLoading, error };
}