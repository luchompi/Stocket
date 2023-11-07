import { Outlet } from "react-router-dom";
import { RedirectIfNotAuth } from "../../hooks/SessionHooks";
const EmpresaLayout = () => {
  RedirectIfNotAuth();
  return (
    <>
      <div className="col col-md-8">
        <div className="card">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default EmpresaLayout;
