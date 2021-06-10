import React, { Fragment, useState } from 'react'
import '../Login/login.css'
const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null);

    const sendData = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim() || !email.trim()) {
          setError("Rellena los campos");
          return;
        }
        else {
          setError(null);
        }
        const res = await fetch("http://127.0.0.1:5000/user/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password:password,
            email:email,
            role_type:"user"
        }),
    }); 
        if (res.status === 400){
            setError("Ya existe ese usuario o email")
            
        } else if (res.status === 201){
            props.handleIsRecover()
            
        }
    };
    return (
        <Fragment>
            <h1>REGÍSTRATE</h1>
            <form onSubmit={sendData}>
                <div className="form-container">
                    <label htmlFor="username">Nombre de usuario</label>
                    <input 
                        name="username" 
                        type="text"
                        id="username"
                        alt="Escribe tu nombre de usuario"
                        placeholder="Nombre de usuario"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <label htmlFor="email">Email</label>
                    <input 
                        name="email" 
                        type="email"
                        id="email"
                        alt="Escribe tu email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
                    <p>¿Ya estás registrado? <span onClick={props.handleIsLogin} className="yellow"> Inicia sesión </span></p>
                    {error ? <span className="text-danger">{error}</span> : null}
                    <button>REGÍSTRATE</button>
                </div>
            </form>
        </Fragment>
    )
}

export default LoginForm
