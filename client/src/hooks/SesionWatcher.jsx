import { useEffect } from "react";
import useSesionStore from "../store/sesion.store.js";

const SesionWatcher = () => {
  const { isAuth, counter } = useSesionStore.getState();
  const { incrementTimer, logout } = useSesionStore((state) => state);
  useEffect(() => {
    const interval = setInterval(() => {
      isAuth ? incrementTimer() : null;
      counter > 60 ? logout() : null;
    }, 1000);
    return () => clearInterval(interval);
  }, [incrementTimer, isAuth, counter,logout]);

  return <></>;
};

export default SesionWatcher;
