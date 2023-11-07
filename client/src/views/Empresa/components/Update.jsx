import EmpresaForm from "./EmpresaForm";
import { useEffect } from "react";
import EventEmitter from "../../../helpers/EventEmitter";
import { actualizarDatosEmpresa } from "../services/empresa.apis";
import useSesionStore from "../../../store/sesion.store";

const Update = () => {
  const  setEmpresaData  = useSesionStore((state) => state.setEmpresaData());
  const { empresaData } = useSesionStore.getState();
  const onUpdateEmpresa = async (data) => {
    return await actualizarDatosEmpresa(data.NIT, data).then((Response) => {
      setEmpresaData({data});
      console.log(empresaData);
      console.log(Response.data)
    });
  };
  useEffect(() => {
    const onsave = (data) => {
      onUpdateEmpresa(data);
    };
    const listener = EventEmitter.addListener("onUpdateEmpresa", onsave);
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
        <EmpresaForm />
      </div>
    </>
  );
};

export default Update;
