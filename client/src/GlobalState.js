import { createContext, useEffect, useState } from "react";
import ProductApi from "./components/api/ProductApi";
import UserApi from "./components/api/UserApi";
import api from "./api";
import axios from "axios";

export const GlobalState = createContext()

export const DataProvider = ({children}) => {

    const [token, setToken] = useState(false);

    const refreshToken = async() => {
        try {
            const res = await api.post('/user/refresh_token');
            setToken(res.data.accessToken);
        } catch (err) {
            console.error("Failed to refresh token:", err.response?.data || err.message);
        }
    };

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        
        if(firstLogin){
            refreshToken();
        }
    },[]);

    const state = {
        token: [token, setToken],
        productApi: ProductApi(),
        userApi: UserApi(token)
    }
    
    return (
    <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>
    )
}