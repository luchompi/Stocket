import React from "react";
import EventEmitter from "../../../helpers/EventEmitter";
const FormProfile = () => {
  const [data, setData] = React.useState({
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    city: "",
    uid: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    EventEmitter.emit("onSave", data);
  };
  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          {/*Identificación */}
          <label htmlFor="UID">
            Identificación <i className="ri-hashtag"></i>
          </label>
          <input
            type="text"
            className="form-control form-control-border border-width-2"
            id="UID"
            placeholder="Especifique su identificación. Ej: 1234567890"
            name="uid"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {/*Nombres */}
          <label htmlFor="FirstName">
            Nombres <i className="ri-account-box-line"></i>
          </label>
          <input
            type="text"
            className="form-control form-control-border border-width-2"
            id="FirstName"
            placeholder="Ingrese su nombre. Ej: pepe"
            name="first_name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {/*Apellidos */}
          <label htmlFor="LastName">
            Apellidos <i className="ri-account-box-line"></i>
          </label>
          <input
            type="text"
            className="form-control form-control-border border-width-2"
            id="LastName"
            placeholder="Ingrese sus apellidos. Ej: perez"
            name="last_name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {/*Ciudad */}
          <label htmlFor="City">
            Ciudad de residencia <i className="ri-crosshair-fill"></i>
          </label>
          <input
            type="text"
            className="form-control form-control-border border-width-2"
            id="City"
            placeholder="Ciudad de residencia. Ej: Bogotá DC"
            name="city"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {/*Dirección */}
          <label htmlFor="Address">
            Dirección de residencia <i className="ri-map-2-line"></i>
          </label>
          <input
            type="text"
            className="form-control form-control-border border-width-2"
            id="Address"
            placeholder="Defina dirección de residencia. Ej. Calle 123 # 123-123"
            name="address"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {/*Teléfono */}
          <label htmlFor="Phone">
            Teléfono de contacto <i className="ri-cellphone-line"></i>
          </label>
          <input
            type="text"
            className="form-control form-control-border border-width-2"
            id="Phone"
            placeholder="Defina su teléfono de contacto. Ej: 6057270000 ó 3177777777"
            name="phone"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormProfile;
