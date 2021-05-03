import React, { Fragment, useState } from 'react'
import '../Login/login.css'
import {Link} from 'react-router-dom'
const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [error, setError] = useState(null);

    const sendData = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim() || !checkPassword.trim()) {
          //si el campo está vacio
          setError("Rellena los campos");
          return;
        }
        if (password !== checkPassword){
            setError("Las contraseñas no coinciden")
        }
        else {
          setError(null);
        }

    }
    return (
        <Fragment>
            <h1>REGÍSTRATE</h1>
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
                    <label htmlFor="checkPassword">Repetir contraseña</label>
                    <input 
                        name="checkPassword" 
                        type="password"
                        id="checkPassword"
                        alt="Escribe tu contraseña otra vez"
                        placeholder="Repite la contraseña"
                        onChange={(e) => setCheckPassword(e.target.value)}
                        value={checkPassword}
                    />
                    {error ? <span className="text-danger">{error}</span> : null}
                    <button>Regístrate</button>
                </div>
            </form>
        </Fragment>
    )
}

export default LoginForm
