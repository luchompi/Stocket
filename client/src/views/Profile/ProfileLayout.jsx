import { Outlet } from "react-router-dom";
import { RedirectIfNotAuth } from "../../hooks/SessionHooks";

const ProfileLayout = () => {
  RedirectIfNotAuth();
  return (
    <div className="col col-lg-5">
      <div className="card">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
