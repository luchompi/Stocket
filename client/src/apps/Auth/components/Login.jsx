import {useState} from 'react'
import {obtenerTokens} from "../services/auth.apis.js";
import sesionStore from "../../../store/sesion.store.js";
import {errorMessage, successMessage} from "../../../components/messages.js";

const Login = () => {
    document.title = 'Login - Stocket'
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const setTokens = sesionStore((state) => state.setTokens)
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await obtenerTokens(data)
            .then((Response) => {
                setTokens(Response.data)
                successMessage('¡Hecho!', 'Sesión iniciada correctamente.')
            })
            .catch((error) => {
                errorMessage(error.response.data)
            })
    }
    return (
        <>
            <div className="card-header">Iniciar sesión</div>
            <div className="card-body">
                <div className="card-title h4">
                    Ingrese sus credenciales para iniciar sesión
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-person-badge"></i></span>
                        <div className="form-floating">
                            <input type="text" className="form-control" name="username" id="floatingInputGroupUsername"
                                   placeholder="Username" required onChange={handleChange}/>
                            <label htmlFor="floatingInputGroupUsername">Usuario</label>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-key"></i></span>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingInputGroupPassword"
                                   placeholder="Contraseña" name="password" onChange={handleChange} required/>
                            <label htmlFor="floatingInputGroupPassword">Contraseña</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Entrar <i className="bi bi-door-open"></i>
                    </button>
                    <p className="text-muted">¿Olvidó su contraseña?</p>
                </form>
            </div>
        </>
    )
}

export default Login