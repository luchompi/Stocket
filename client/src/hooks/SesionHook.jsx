import sesionStore from "../store/sesion.store.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const RedirectIfIsAuth = () => {
    const {isAuth} = sesionStore.getState()
    const navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(()=>{
            isAuth ? navigate('/') : navigate('/auth/login')
        },1000)
        return () => clearInterval(interval)
    }, [isAuth,navigate]);
    return (
        <div/>
    )
}