import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import sesionStore from "../store/sesion.store.js";
import {successMessage} from "./messages.js";

const Navbar = (props) => {
    const {isAuth} = sesionStore.getState();
    const doLogout = sesionStore((state) => state.logout)
    const logout = () => {
        doLogout()
        successMessage('¡Hecho!', 'Sesión cerrada con éxito')
        setInterval(() => {
            location.reload
        }, 3000)
    }


    return (
        <div>
            <header>
                <div className="px-3 py-2 text-bg-dark border-bottom">
                    <div className="container">
                        <div
                            className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                            <Link to={`/`}
                                  className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                                <h4>Stocket - <i className="bi bi-boxes"></i></h4>
                            </Link>

                            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                                <li>
                                    <a href="#" className="nav-link text-secondary">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link text-white">
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link text-white">
                                        Orders
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link text-white">
                                        Products
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link text-white">
                                        Customers
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="px-3 py-2 border-bottom mb-3">
                    <div className="container d-flex flex-wrap justify-content-center">
                        <div className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
                            Fecha y hora: {props.dateTime}
                        </div>

                        <div className="text-end">
                            {isAuth ?
                                (<>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                            Usuario : myUser - Rol: MiRol
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" onClick={logout}>Cerrar sesión <i
                                                className="bi bi-power"></i></a></li>
                                        </ul>
                                    </div>
                                </>)
                                : (<>
                                    <Link to={`/auth/login`} type="button"
                                          className="btn btn-light text-dark me-2">Login</Link>
                                    <button type="button" className="btn btn-primary">Sign-up</button>
                                </>)}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

Navbar.propTypes = {
    dateTime: PropTypes.string
}

export default Navbar