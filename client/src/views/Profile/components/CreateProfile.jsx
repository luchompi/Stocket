import React from "react";
import FormProfile from "./FormProfile";

const CreateProfile = () => {
  return (
    <>
      <div className="card-header">Crear Perfil de usuario</div>
      <div className="card-body">
        <h5>Ingrese los datos solicitados </h5>
        <FormProfile />
      </div>
    </>
  );
};

export default CreateProfile;
