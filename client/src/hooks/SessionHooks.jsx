import useSesionStore from "../store/sesion.store.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const RedirectIfIsAuth = () => {
  const { isAuth } = useSesionStore.getState();
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      isAuth ? navigate("/home") : navigate("/login");
    }, 100);
    return () => clearInterval(interval);
  }, [isAuth, navigate]);
  return <div />;
};

export const RedirectIfNotAuth = () => {
  const { isAuth } = useSesionStore.getState();
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      isAuth ? null : navigate("/login");
    }, 100);
    return () => clearInterval(interval);
  }, [isAuth, navigate]);
  return <div />;
};
