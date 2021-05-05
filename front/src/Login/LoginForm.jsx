import React, { Fragment, useState } from 'react'
import './login.css'

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);

    const sendData = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
          //si el campo está vacio
          setError("Rellena los campos");
          return;
        } else {
          setError(null);
        }

    }
    return (
        <Fragment>
            <h1>INICIAR SESIÓN</h1>
            <form onSubmit={sendData}>
                <div className="form-container">
                    <label htmlFor="username">Usuario</label>
                    <input 
                        name="username" 
                        type="text"
                        id="username"
                        alt="Escribe tu usuario"
                        placeholder="Usuario"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        name="password" 
                        type="password"
                        id="password"
                        alt="Escribe tu contraseña"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <p>¿No tienes cuenta? <span onClick={props.handleIsRegister} class="yellow"> Regístrate </span></p>
                    
                    <p>¿Has olvidado tu contraseña? <span onClick={props.handleIsRecover} class="yellow"> Recupérala </span></p>
                    {error ? <span className="text-danger">{error}</span> : null}
                    <button>ACCEDER</button>
                </div>
            </form>
        </Fragment>
    )
}

export default LoginForm
