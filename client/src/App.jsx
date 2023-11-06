import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import SesionWatcher from "./hooks/SesionWatcher.jsx";
import useSesionStore from "./store/sesion.store.js";
import { solicitarTokenAcceso } from "./views/Auth/services/auth.apis.js";
const App = () => {
  const [dateTime, setDateTime] = useState("");
  const { counter, userData, isAuth } = useSesionStore.getState();
  const { resetTimer, setAccessToken } = useSesionStore((state) => state);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const checkSesionStatus = async () => {
    if (counter > 1700000 && counter < 1799999) {
      await solicitarTokenAcceso().then((Response) => {
        resetTimer();
        setAccessToken(Response.data.access);
      });
    }
  };
  SesionWatcher();
  return (
    <div onMouseMove={checkSesionStatus}>
      <Navbar dateTime={dateTime} />
      <hr />
      {isAuth ? (
        userData?.uid ? null : (
          <>
            <div className="alert alert-info alert-dismissible">
              <strong>
                <i className="ri-information-line"></i> Atención!
              </strong>
              Su perfil se encuentra incompleto. Por favor, diligencie los datos
              requeridos.
            </div>
          </>
        )
      ) : null}
      {isAuth ? (
        userData?.groups.includes("Administrador", "administradores") ||
        userData?.is_superuser ? null : (
          <>
            <div className="alert alert-warning alert-dismissible">
              <strong>
                <i className="ri-error-warning-line"></i> ¡Atención! {""}
              </strong>
              Su perfil tiene permisos de administrador, tenga cuidado con los
              cambios que haga, ya que no se pueden deshacer.
            </div>
          </>
        )
      ) : null}
      <div className="row justify-content-md-center">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
