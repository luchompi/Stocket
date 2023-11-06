import { Link } from "react-router-dom";
import { IconHelperWitoutColors } from "../../../helpers/IconHelper";
import useSesionStore from "../../../store/sesion.store";

const Profile = () => {
  document.title = "Perfil de usuario - Stocket";
  const { userData } = useSesionStore.getState();
  return (
    <div>
      <div className="card-header">
        <h3 className="card-title">Perfil de usuario</h3>
        <div className="card-tools">
          <Link to={`/profile/nuevo/`} className="btn btn-success">
            Agregar
          </Link>
        </div>
      </div>

      <div className="card-body">
        <div className="row">
          <IconHelperWitoutColors
            url={"https://cdn.lordicon.com/mebvgwrs.json"}
          />
          <div className="col">
            <h2>Hola, {userData?.username}</h2>
            <h4>Identificación: {userData?.uid || "N/A"}</h4>
            <h5>Rol: {userData?.groups[0] || "Invitado"}</h5>
            <p>
              Nombres:{" "}
              {userData?.first_name && userData?.last_name
                ? userData?.first_name + " " + userData?.last_name
                : "N/A"}
            </p>
            <p>Ciudad: {userData?.city || "N/A"}</p>
            <p>Dirección: {userData?.address || "N/A"}</p>
            <p>Teléfono: {userData?.phone || "N/A"}</p>
            <p>Correo: {userData?.email || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
