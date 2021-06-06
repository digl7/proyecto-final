import React, { Fragment, useState } from 'react'
import { useHistory } from "react-router-dom";

import './login.css'
//Props para pasarle a Login.jsx handleIsRegister (con esto cambiamos a la pestaña registro) y handleIsRecover (con esto cambiamos a la pestaña recover)
const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);

    //para poder usar history.push al hacer login
    let history = useHistory();

    const sendData = async (e) => {
        e.preventDefault();
        //si los campo están vacios
        if (!username.trim() || !password.trim()) {
          setError("Rellena los campos");
          return;
        } else {
          setError(null);
        }
        const res = await fetch("http://127.0.0.1:5000/user/login", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                role_type: "user"
            }),
        });
        const data = await res.json()
        if (res.status === 200){
            //añado a localStorage los datos del usuario que voy necesitar.
            localStorage.setItem('user_id', data.user.id)
            localStorage.setItem('user_name', data.user.username)
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            history.push("/")
        } else {
            setError("Datos incorrectos o tienes que activar el correo para poder acceder")
        }
        };
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
                    <p>¿No tienes cuenta? <span onClick={props.handleIsRegister} className="yellow"> Regístrate </span></p>
                    
                    <p>¿Quieres activar tu cuenta? <span onClick={props.handleIsRecover} className="yellow"> Actívala </span></p>
                    {error ? <span className="text-danger">{error}</span> : null}
                    <button>ACCEDER</button>
                </div>
            </form>
        </Fragment>
    )
}

export default LoginForm
