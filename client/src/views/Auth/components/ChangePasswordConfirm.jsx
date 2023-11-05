import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconHelperWitoutColors } from "../../../helpers/IconHelper";
import { confirmarCambioContraseña } from "../services/auth.apis";
import { errorMessage, successMessage } from "../../../components/messages";
import Loading from "../../../components/Loading";

const ChangePasswordConfirm = () => {
  document.title = "Actualizar contraseña - Stocket";
  const { uid, token } = useParams();
  const [data, setData] = useState({
    new_password: "",
    re_new_password: "",
    uid: uid,
    token: token,
  });
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.new_password !== data.re_new_password) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [data, setStatus]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await confirmarCambioContraseña(data)
      .then((Response) => {
        successMessage(
          "¡Hecho!",
          "Contraseña actualizada correctamente. Ahora puede iniciar sesión con sus nuevas credenciales"
        );
        navigate("/login");
      })
      .catch((error) => {
        errorMessage(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="card-header">
        <h3 className="card-title">Actualizar contraseña</h3>
      </div>
      <div className="card-body">
        <h5>Actualización de contraseña</h5>
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <p>Ingrese su nueva Contraseña</p>
            <div className="row">
              <IconHelperWitoutColors
                url={"https://cdn.lordicon.com/zfzufhzk.json"}
              />
              <div className="col">
                <form className="form-horizontal" onSubmit={handleSubmit}>
                  {/*Contraseña */}
                  <div className="form-group">
                    <label htmlFor="Password">
                      Contraseña <i className="ri-lock-password-line"></i>
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-border border-width-2"
                      id="Password"
                      placeholder="Ingrese su contraseña"
                      name="new_password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/*Repetir Contraseña */}
                  <div className="form-group">
                    <label htmlFor="Password">
                      Contraseña <i className="ri-lock-password-line"></i>
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-border border-width-2"
                      id="Password"
                      placeholder="Ingrese su contraseña"
                      name="re_new_password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {status ? (
                    <>
                      <div className="alert alert-danger alert-dismissible">
                        Las contraseñas no coinciden.
                      </div>
                    </>
                  ) : null}
                  <div className="container">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={status}
                    >
                      Guardar <i className="ri-save-3-fill"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordConfirm;
