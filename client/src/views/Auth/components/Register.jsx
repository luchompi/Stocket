import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { guardarUsuario } from "../services/auth.apis";
import { errorMessage, successMessage } from "../../../components/messages";
import { useNavigate } from "react-router-dom";
import { IconHelperWithColors } from "../../../helpers/IconHelper";
const Register = () => {
  document.title = "Stocket - Registrar usuario";
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    re_password: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data.password !== data.re_password) {
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
    await guardarUsuario(data)
      .then((Response) => {
        successMessage(
          "Usuario registrado",
          "Se ha registrado el usuario con éxito. Verifique su correo electrónico para activar su cuenta."
        );
        navigate("/login");
      })
      .catch((error) => {
        errorMessage(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(data);
  };
  return (
    <div>
      <div>
        <div className="card-header">
          <h3 className="card-title">Registrar usuario - Stocket</h3>
        </div>
        <div className="card-body">
          {loading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              <h5>Ingrese los datos requeridos</h5>

              <div className="row">
                <IconHelperWithColors
                  url={"https://cdn.lordicon.com/bgebyztw.json"}
                  colors={"primary:#66a1ee,secondary:#2516c7"}
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
                          required
                          onChange={handleChange}
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
                          required
                          onChange={handleChange}
                        />
                      </div>
                      {/*Repita contraseña */}
                      <div className="form-group">
                        <label htmlFor="RePassword">
                          repita su contraseña{" "}
                          <i className="ri-lock-password-line"></i>
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-border border-width-2"
                          id="RePassword"
                          placeholder="Ingrese su contraseña"
                          name="re_password"
                          required
                          onChange={handleChange}
                        />
                      </div>
                      {status ? (
                        <>
                          <div className="alert alert-danger alert-dismissible">
                            Las contraseñas no coinciden.
                          </div>
                        </>
                      ) : null}
                      {/*email */}
                      <div className="form-group">
                        <label htmlFor="Password">
                          Correo electrónico{" "}
                          <i className="ri-mail-send-fill"></i>
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-border border-width-2"
                          id="Password"
                          placeholder="Ingrese su contraseña"
                          name="email"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success">
                      Registrarse <i className="ri-login-box-line"></i>
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
