import React from "react";
import { IconHelperWithColors } from "../../helpers/IconHelper.jsx";
import { obtenerDatosUsuario } from "./services/principal.apis.js";
import useSesionStore from "../../store/sesion.store.js";
const Home = () => {
  document.title = "Stocket - Inicio";
  const { isAuth } = useSesionStore.getState();
  const setUserData = useSesionStore((state) => state.setUserData);
  const guardarDatosUsuario = async () => {
    const { data } = await obtenerDatosUsuario();
    setUserData(data);
  };
  if (isAuth) {
    guardarDatosUsuario();
  }

  return (
    <div className="col col-lg-6">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Stocket</h3>
        </div>
        <div className="card-body" style={{ justifyContent: "center" }}>
          <div className="row">
            <IconHelperWithColors
              url={"https://cdn.lordicon.com/hnppcsvw.json"}
              colors={"primary:#4030e8,secondary:#66a1ee"}
            />
            <div className="col">
              <h4>Bienvenido a Stocket</h4>
              <p>Su sistema de inventario TI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
