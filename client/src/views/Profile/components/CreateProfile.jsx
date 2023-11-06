import { useEffect, useState } from "react";
import FormProfile from "./FormProfile";
import EventEmitter from "../../../helpers/EventEmitter";
import Loading from "../../../components/Loading";
import { actualizarPerfilUsuario } from "../services/profile.apis";
import { successMessage } from "../../../components/messages";
import { IconHelperWitoutColors } from "../../../helpers/IconHelper";
import { useNavigate } from "react-router-dom";
import useSesionStore from "../../../store/sesion.store";
const CreateProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUserData = useSesionStore((state) => state.setUserData);

  const saveData = async (data) => {
    setLoading(true);
    await actualizarPerfilUsuario(data)
      .then((Response) => {
        setUserData(Response.data);
        successMessage("¡Hecho!", "Perfil actualizado correctamente");
        navigate("/profile/");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const onSave = (data) => {
      saveData(data);
    };
    const listener = EventEmitter.addListener("onSave", onSave);
    return () => {
      listener.remove();
    };
  }, []);
  return (
    <>
      <div className="card-header">Crear Perfil de usuario</div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="card-body">
            <h5>Ingrese los datos solicitados </h5>
            <div className="row">
              <IconHelperWitoutColors
                url={"https://cdn.lordicon.com/zfzufhzk.json"}
              />
              <div className="col">
                <FormProfile />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateProfile;
