import { useNavigate } from "react-router-dom";
import SesionStore from "../stores/auth.store";
import { getTokens, getUserData } from "../apis/auth.apis";

const SesionHook = () => {
  const { isLogged, setTokens } = SesionStore((state) => state);
  const url = useNavigate();

  const redirectIfAuth = () => {
    isLogged && url("/dashboard");
  };

  const redirectIfNotAuth = () => {
    !isLogged && url("/login");
  };

  const makeLogin = async (data) => {
    await getTokens(data)
      .then((Response) => {
        setTokens(Response.data);
        console.log(Response.data);
      })
      .then(() => {
        getUserData().then((Response) => {
          console.log(Response.data);
        });
      });
  };

  return { redirectIfAuth, redirectIfNotAuth, makeLogin };
};

export default SesionHook;
