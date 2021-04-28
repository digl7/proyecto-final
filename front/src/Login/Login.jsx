import React, {useState} from 'react'
import NavBar from '../NavBar/NavBar'
import './login.css'
import LoginForm from './LoginForm'
import RegisterForm from '../Register/RegisterForm'

const Login = () => {
    const [isLogin, setIsLogin] = useState("Login")

    return (
        <div className="login-container">
            <NavBar/>
            <main>
                <div className="login-block">
                    <div className="options">
                        <div onClick={() => setIsLogin("Login")} className="login">
                            <h2>Iniciar sesion</h2>

                        </div>
                        <div onClick={() => setIsLogin("Register")} className="register">
                            <h2> Registrate - icono</h2>

                        </div>
                        <div onClick={() => setIsLogin("Recover")} className="recover">
                            <h2> Recuperar contraseña - icono</h2>
                        </div>
                    </div>
                    <div className="info">
                        
                        { 
                            isLogin === 'Login' ? <LoginForm/> :
                            isLogin === 'Register' ? <RegisterForm/> :
                            isLogin === 'Recover' ? "soy recover" : <LoginForm/>
                        }     
                            
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login
