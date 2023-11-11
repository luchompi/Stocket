import { useState } from "react";
import useSesionStore from "../../../store/sesion.store";
import EventEmitter from "../../../helpers/EventEmitter";

const EmpresaForm = () => {
  const isAuth = useSesionStore((state) => state.isAuth);
  const reciever = useSesionStore.getState().empresaData[0] || {};
  const [empresa, setEmpresa] = useState({
    NIT: reciever.NIT || "",
    name: reciever.name || "",
    address: reciever.address || "",
    phone: reciever.phone || "",
    email: reciever.email || "",
    web: reciever.web || "",
    description: reciever.description || "",
  });

  const handleChange = (e) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reciever.NIT ? EventEmitter.emit("onUpdateEmpresa", empresa) : EventEmitter.emit("onCreateEmpresa", empresa);
  };

  return (
    <>
      {isAuth ? (
        <>
          <form onSubmit={handleSubmit} className="form-horizontal">
            {reciever.NIT ? null : (
              <>
                {/*NIT */}
                <div className="form-group">
                  <label htmlFor="NIT">
                    NIT <i className="ri-account-box-line"></i>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-border border-width-2"
                    id="NIT"
                    placeholder="Ingrese su usuario. Ej: 440001256"
                    name="NIT"
                    onChange={handleChange}
                    required={!reciever.NIT}
                  />
                </div>
              </>
            )}
            {/*Razon social */}
            <div className="form-group">
              <label htmlFor="Name">
                Nombre de la empresa <i className="ri-account-box-line"></i>
              </label>
              <input
                type="text"
                className="form-control form-control-border border-width-2"
                id="Name"
                placeholder="Ingrese nombre de la empresa. Ej: Empresa S.A."
                name="name"
                onChange={handleChange}
                required={!reciever.name}
              />
            </div>
            {/*Dirección */}
            <div className="form-group">
              <label htmlFor="Address">
                Dirección <i className="ri-account-box-line"></i>
              </label>
              <input
                type="text"
                className="form-control form-control-border border-width-2"
                id="Address"
                placeholder="Dirección de la empresa. Ej: Calle 123 # 45-67"
                name="address"
                onChange={handleChange}
                required={!reciever.address}
              />
            </div>
            {/*Teléfono */}
            <div className="form-group">
              <label htmlFor="Phone">
                Teléfono <i className="ri-account-box-line"></i>
              </label>
              <input
                type="text"
                className="form-control form-control-border border-width-2"
                id="Phone"
                placeholder="Teléfono de contacto. Ej: 3001234567"
                name="phone"
                onChange={handleChange}
                required={!reciever.phone}
              />
            </div>
            {/*Correo electrónico */}
            <div className="form-group">
              <label htmlFor="Email">
                Correo <i className="ri-account-box-line"></i>
              </label>
              <input
                type="text"
                className="form-control form-control-border border-width-2"
                id="Email"
                placeholder="Ingrese su usuario. Ej: pepe.perez"
                name="email"
                onChange={handleChange}
                required={!reciever.email}
              />
            </div>
            {/*Página web */}
            <div className="form-group">
              <label htmlFor="Web">
                URL <i className="ri-account-box-line"></i>
              </label>
              <input
                type="text"
                className="form-control form-control-border border-width-2"
                id="Web"
                placeholder="Enlace web a la página. Ej: https://www.google.com"
                name="web"
                onChange={handleChange}
              />
            </div>
            {/*Descripción */}
            <div className="form-group">
              <label htmlFor="Username">
                Descripción de la empresa <i className="ri-file-text-line"></i>
              </label>
              <div className="container">
                <textarea
                  name="description"
                  onChange={handleChange}
                  placeholder="Ingrese una breve descripcion de la empresa"
                  style={{
                    width: "500px",
                    height: "200px",
                  }}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Guardar
            </button>
          </form>
        </>
      ) : null}
    </>
  );
};

export default EmpresaForm;
