import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { successMessage, errorMessage } from "../../../components/messages.js";
import { activarCuenta } from "../services/auth.apis.js";
import Loading from "../../../components/Loading";
import { RedirectIfIsAuth } from "../../../hooks/SessionHooks.jsx";

const Activate = () => {
  document.title = "Stocket - Activar cuenta";
  RedirectIfIsAuth();
  const { uid, token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const activate = async () => {
    setLoading(true);
    await activarCuenta({ uid, token })
      .then((Response) => {
        successMessage(
          "Hecho",
          "Cuenta activada correctamente. Ya puede iniciar sesión."
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
      <div className="callout callout-warning">
        <h5>Activar cuenta</h5>
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <div className="row">
            <div
              className="col col-lg-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <lord-icon
                src="https://cdn.lordicon.com/zrkkrrpl.json"
                trigger="loop"
                colors="primary:#66a1ee,secondary:#2516c7"
                style={{ width: "150px", height: "150px" }}
              ></lord-icon>
            </div>
            <div className="col">
              <article style={{ textAlign: "justify" }}>
                Está a punto de activar la cuenta, para hacerlo haga click{" "}
                <button className="btn btn-success" onClick={activate}>
                  Aquí
                </button>{" "}
                y contacte a sistemas para que le asignen un rol.
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activate;
