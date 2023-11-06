import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import SesionWatcher from "./hooks/SesionWatcher.jsx";
import useSesionStore from "./store/sesion.store.js";
import { solicitarTokenAcceso } from "./views/Auth/services/auth.apis.js";
const App = () => {
  const [dateTime, setDateTime] = useState("");
  const { counter } = useSesionStore.getState();
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
      <div className="row justify-content-md-center">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
