import { useState } from "react";
import Loading from "../../../components/Loading";
import { obtenerTokens } from "../services/auth.apis";
import { successMessage, errorMessage } from "../../../components/messages";
import useSesionStore from "../../../store/sesion.store";
import { useNavigate, Link } from "react-router-dom";
import { RedirectIfIsAuth } from "../../../hooks/SessionHooks";
import { IconHelperWithColors } from "../../../helpers/IconHelper";
import { obtenerDatosUsuario } from "../../Principal/services/principal.apis";

const Login = () => {
  document.title = "Stocket - Iniciar Sesión";
  RedirectIfIsAuth();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const setTokens = useSesionStore((state) => state.setTokens);
  const setUserData = useSesionStore((state) => state.setUserData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await obtenerTokens(data)
      .then((Response) => {
        successMessage("Bienvenido", "Sesión iniciada con éxito");
        setTokens(Response.data);
        obtenerDatosUsuario().then((response) => {
          setUserData(response.data);
        });
        navigate("/home");
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
        <h3 className="card-title">Iniciar Sesión - Stocket</h3>
      </div>
      <div className="card-body">
        <h5>Ingrese sus credenciales para empezar</h5>

        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="row">
              <IconHelperWithColors
                url={"https://cdn.lordicon.com/ppsqwkvn.json"}
                colors={"primary:#9cc2f4,secondary:#3080e8"}
              />
              <div className="col">
                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="form-group">
                      {/*Usuario */}
                      <label htmlFor="Username">
                        Usuario <i className="ri-account-box-line"></i>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-border border-width-2"
                        id="Username"
                        placeholder="Ingrese su usuario. Ej: pepe.perez"
                        name="username"
                        onChange={handleChange}
                        required
                      />
                    </div>
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
                        name="password"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="container">
                    <div className="btn-group">
                      <button type="submit" className="btn btn-success">
                        Entrar <i className="ri-login-box-line"></i>
                      </button>
                      <Link to={`/forgot-password`} className="btn btn-default">
                        ¿Olvidó su contraseña?{" "}
                        <i className="ri-question-line"></i>
                      </Link>
                    </div>
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

export default Login;
