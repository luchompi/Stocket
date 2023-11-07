import EmpresaForm from "./EmpresaForm";
import { useEffect } from "react";
import EventEmitter from "../../../helpers/EventEmitter";
import {
  actualizarDatosEmpresa,
  obtenerDatosEmpresa,
} from "../services/empresa.apis";
import useSesionStore from "../../../store/sesion.store";
import { errorMessage, successMessage } from "../../../components/messages.js";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const setEmpresa = useSesionStore((state) => state.setEmpresaData);
  const empresaData = useSesionStore((state) => state.empresaData);
  const navigate = useNavigate();
  const saveData = async (data) => {
    await actualizarDatosEmpresa(empresaData[0]?.NIT, data)
      .then((Response) => {
        successMessage("Datos actualizados correctamente");
      })
      .then(() => {
        obtenerDatosEmpresa().then((Response) => {
          setEmpresa(Response.data);
          navigate("/empresa/details");
        });
      })
      .catch((error) => {
        errorMessage(error.response.data);
      });
  };
  useEffect(() => {
    const onUpdateEmpresa = (data) => {
      saveData(data);
    };
    const listener = EventEmitter.addListener(
      "onUpdateEmpresa",
      onUpdateEmpresa
    );
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <>
      <div className="card-header">
        <h3 className="card-title">Datos de empresa</h3>
        <div className="card-tools"></div>
      </div>
      <div className="card-body">
        <h4>Ingrese los datos a actualizar</h4>
        <EmpresaForm data={empresaData} />
      </div>
    </>
  );
};

export default Update;
