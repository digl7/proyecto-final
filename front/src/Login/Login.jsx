import React, {useState} from 'react'
import NavBar from '../NavBar/NavBar'
import './login.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="login-container">
            <NavBar/>
            <main>
                <div className="login-block">
                    <div className="options">
                        <div onClick={() => setIsLogin(true)} className="login">
                            <h2>Iniciar sesion</h2>

                        </div>
                        <div onClick={() => setIsLogin(false)} className="register">
                            <h2> Registrate - icono</h2>

                        </div>
                        <div className="recover">
                            <h2> Recuperar contraseña - icono</h2>
                        </div>
                    </div>
                    <div className="info">
                        {
                            isLogin  ? 
                            <LoginForm/> : <RegisterForm/>
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login
