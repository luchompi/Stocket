import React from "react";
import {IconHelperWitoutColors} from "../../helpers/IconHelper.jsx";

const Home = () => {
    document.title = "Stocket - Inicio";
    return (
        <div className="col col-lg-6">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Stocket</h3>
                </div>
                <div className="card-body" style={{justifyContent: "center"}}>
                    <div className="row">
                        <IconHelperWitoutColors url={"https://cdn.lordicon.com/wegsbupf.json"}/>
                        <div className="col">
                            <h4>Bienvenido a Stocket</h4>
                            <p>Su sistema de inventario TI</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Home;
