import { useEffect } from "react";
import useSesionStore from "../store/sesion.store.js";
import { warningMessage } from "../components/messages.js";
const SesionWatcher = () => {
  const { isAuth, counter } = useSesionStore.getState();
  const { incrementTimer, logout } = useSesionStore((state) => state);
  useEffect(() => {
    const interval = setInterval(() => {
      isAuth ? incrementTimer() : null;
      if (counter > 1799999) {
        logout();
        warningMessage(
          "Su sesión ha expirado",
          "Vuelva a iniciar sesión para continuar"
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [incrementTimer, isAuth, counter, logout]);

  return <></>;
};

export default SesionWatcher;
