import { useEffect, useState } from "react";
import EventEmitter from "../../../helpers/EventEmitter";
import EmpresaForm from "./EmpresaForm";
import { guardarDatosEmpresa } from "../services/empresa.apis";
import useSesionStore from "../../../store/sesion.store";
import { errorMessage, successMessage } from "../../../components/messages";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const setEmpresa = useSesionStore((state) => state.setEmpresaData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const onCreateEmpresa = async (data) => {
      setLoading(true);
      await guardarDatosEmpresa(data)
        .then((Response) => {
          console.log(Response.data);
          setEmpresa(null);
          setEmpresa(Response.data);
          successMessage("Datos guardados correctamente");
          navigate("/empresa/details");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    const listener = EventEmitter.addListener(
      "onCreateEmpresa",
      onCreateEmpresa
    );
    return () => {
      listener.remove();
    };
  }, [setEmpresa, navigate]);

  return (
    <>
      <div className="card-header">
        <h3 className="card-title">Datos de empresa</h3>
        <div className="card-tools"></div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="card-body">
          <EmpresaForm />
        </div>
      )}
    </>
  );
};

export default Create;
