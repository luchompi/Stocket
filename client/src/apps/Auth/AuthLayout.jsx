import { Outlet } from 'react-router-dom'
import {RedirectIfIsAuth} from "../../hooks/SesionHook"
const AuthLayout = () => {
  RedirectIfIsAuth()

  return (
    <div>
        <div className="row justify-content-md-center">
            <div className="col col-lg-5">
                <div className="card">
                    <Outlet/>
                </div>
            </div>
        </div>
    </div>
  )
}
export default AuthLayout