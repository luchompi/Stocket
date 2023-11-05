import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="col col-lg-5">
      <div className="card">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
