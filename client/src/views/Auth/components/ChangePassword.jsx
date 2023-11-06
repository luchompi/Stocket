import { useState } from "react";
import { IconHelperWitoutColors } from "../../../helpers/IconHelper";
import Loading from "../../../components/Loading";
import { errorMessage, successMessage } from "../../../components/messages";
import { useNavigate } from "react-router-dom";
import { actualizarContraseña } from "../services/auth.apis";
import useSesionStore from "../../../store/sesion.store";
const ChangePassword = () => {
  document.title = "Recuperar contraseña - Stocket";
  const [loading, setLoading] = useState(false);
  const { isAuth, userData } = useSesionStore.getState();
  const [data, setData] = useState({
    email: userData?.email || "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await actualizarContraseña(data)
      .then((Response) => {
        successMessage(
          "¡Hecho!",
          "Se ha enviado un correo electrónico con instrucciones para reestablecer su contraseña."
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
        <h3 className="card-title">Recuperar contraseña</h3>
      </div>
      <div className="card-body">
        <h5>Recuperar contraseña</h5>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="row">
              <IconHelperWitoutColors
                url={"https://cdn.lordicon.com/nqisoomz.json"}
              />
              <div className="col">
                {isAuth && userData?.email ? (
                  <>
                    <p>
                      Se enviará un correo electrónico al correo asociado a su
                      cuenta. Para proceder, haga clic{" "}
                      <button
                        className="btn btn-success"
                        onClick={handleSubmit}
                      >
                        Aquí <i className="ri-chat-forward-line"></i>
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                      <p>
                        Ingrese el correo electrónico asociado a su cuenta, y se
                        le enviará un mensaje con instrucciones para
                        reestablecer su contraseña.
                      </p>
                      <div className="card-body">
                        <div className="form-group">
                          {/*Correo */}
                          <label htmlFor="Username">
                            Correo electrónico{" "}
                            <i className="ri-account-box-line"></i>
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-border border-width-2"
                            id="Username"
                            placeholder="Ingrese correo electrónico. Ej: correo@mail.com"
                            name="email"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="container">
                        <div className="btn-group">
                          <button type="submit" className="btn btn-success">
                            Enviar <i className="ri-mail-send-fill"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
