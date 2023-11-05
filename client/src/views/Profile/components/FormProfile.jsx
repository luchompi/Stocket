import React from "react";

const FormProfile = () => {
  return (
    <div>
      <form className="form-inline">
        <div className="input-group input-group-sm">
          <input
            className="form-control form-control-navbar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i className="fas fa-search"></i>
            </button>
            <button
              className="btn btn-navbar"
              type="button"
              data-widget="navbar-search"
            >
              <i className="ri-arrow-right-fill"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormProfile;
