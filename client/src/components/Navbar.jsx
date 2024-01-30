import PropTypes from "prop-types";
import SesionStore from "../stores/auth.store.js";

const Navbar = ({dateTime}) => {
  const {isLogged} = SesionStore((state)=> state)
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark navbar-primary">
        <div className="container">
          <a href="../../index3.html" className="navbar-brand">
            <span className="brand-text font-weight-light">
              Stocket <i className="ri-instance-line"></i>
            </span>
          </a>
          <button
            className="navbar-toggler order-1"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {isLogged && <>
            <div className="collapse navbar-collapse order-3" id="navbarCollapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="index3.html" className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Contact
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                      id="dropdownSubMenu1"
                      href="#"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="nav-link dropdown-toggle"
                  >
                    Dropdown
                  </a>
                  <ul
                      aria-labelledby="dropdownSubMenu1"
                      className="dropdown-menu border-0 shadow"
                  >
                    <li>
                      <a href="#" className="dropdown-item">
                        Some action{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Some other action
                      </a>
                    </li>

                    <li className="dropdown-divider"></li>

                    <li className="dropdown-submenu dropdown-hover">
                      <a
                          id="dropdownSubMenu2"
                          href="#"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          className="dropdown-item dropdown-toggle"
                      >
                        Hover for action
                      </a>
                      <ul
                          aria-labelledby="dropdownSubMenu2"
                          className="dropdown-menu border-0 shadow"
                      >
                        <li>
                          <a tabIndex="-1" href="#" className="dropdown-item">
                            level 2
                          </a>
                        </li>

                        <li className="dropdown-submenu">
                          <a
                              id="dropdownSubMenu3"
                              href="#"
                              role="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              className="dropdown-item dropdown-toggle"
                          >
                            level 2
                          </a>
                          <ul
                              aria-labelledby="dropdownSubMenu3"
                              className="dropdown-menu border-0 shadow"
                          >
                            <li>
                              <a href="#" className="dropdown-item">
                                3rd level
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item">
                                3rd level
                              </a>
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a href="#" className="dropdown-item">
                            level 2
                          </a>
                        </li>
                        <li>
                          <a href="#" className="dropdown-item">
                            level 2
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="ri-timer-line"></i></span>
              </div>
              <input type="text" readOnly className="form-control" value={dateTime}/>
            </div>
          </>}

          <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
            <li className="nav-item">
              <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                  Sesión iniciada
                </button>
                <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Ver Perfil
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Cambiar contraseña
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Salir
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-th-large"></i>
              </a>
            </li>
            <li className="nav-item">
              <a
                  className="nav-link"
                  data-widget="control-sidebar"
                  data-slide="true"
                  href="#"
                  role="button"
              >
                <i className="fas fa-th-large"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>

    </div>
  );
};

Navbar.propTypes = {
  dateTime: PropTypes.string.isRequired
};

export default Navbar;
