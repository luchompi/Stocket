import React from "react";

const Home = () => {
  document.title = "Stocket - Inicio";
  return (
    <div className="col col-lg-7">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Stocket</h3>
        </div>
        <div className="card-body" style={{ justifyContent: "center" }}>
          <div className="row">
            <div className="col">
              <h4>Bienvenido a Stocket</h4>
              <p>Su sistema de inventario TI</p>
            </div>
            <div className="col">
              <lord-icon
                src="https://cdn.lordicon.com/wegsbupf.json"
                trigger="loop"
                style={{ width: "150px", height: "150px" }}
              ></lord-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
