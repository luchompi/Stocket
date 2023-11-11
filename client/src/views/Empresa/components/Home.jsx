import useSesionStore from "../../../store/sesion.store";
import { IconHelperWitoutColors } from "../../../helpers/IconHelper";
import { Link } from "react-router-dom";

const Home = () => {
  const { empresaData } = useSesionStore.getState();

  return (
    <div>
      <div className="card-header">
        <h3 className="card-title">Datos de empresa</h3>
        <div className="card-tools">
          {empresaData && empresaData.length ? (
            <Link to={`/empresa/update`} className="btn btn-warning">
              Editar <i className="ri-edit-line"></i>
            </Link>
          ) : (
            <Link to={`/empresa/create`} className="btn btn-success">
              Añadir{" "}
            </Link>
          )}
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          {empresaData && empresaData.length ? (
            <IconHelperWitoutColors
              url={"https://cdn.lordicon.com/teydnehw.json"}
            />
          ) : (
            <IconHelperWitoutColors
              url={"https://cdn.lordicon.com/jxzkkoed.json"}
            />
          )}
          <div className="col">
            {empresaData && empresaData.length ? (
              <>
                <h3>Razón Social: {empresaData[0]?.name}</h3>
                <div>NIT: {empresaData[0]?.NIT}</div>
                <div>Dirección: {empresaData[0]?.address}</div>
                <div>Teléfono: {empresaData[0]?.phone}</div>
                <div>Correo: {empresaData[0]?.email}</div>
                <div>Web: {empresaData[0]?.web || "No hay datos"}</div>
                <div>
                  Descripción: {empresaData[0]?.description || "No hay datos"}
                </div>
              </>
            ) : (
              <>
                <h3>¡Error!</h3>
                <p>
                  No hay datos para mostrar, añada datos sobre su empresa y
                  vuelva a intentarlo
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
