import {Outlet} from "react-router-dom"

const HomeLayout = () => {
    return (
        <div>
            <div className="row justify-content-md-center">
                <div className="col col-md-10">
                    <div className="card">
                        <div className="card-body">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeLayout