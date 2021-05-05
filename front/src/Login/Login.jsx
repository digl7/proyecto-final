import React, {useState} from 'react'
import NavBar from '../NavBar/NavBar'
import './login.css'
import LoginForm from './LoginForm'
import RegisterForm from '../Register/RegisterForm'
import Recover from '../Recover/Recover'

const Login = () => {
    const [isLogin, setIsLogin] = useState("Login")


    return (
        <div className="login-container">
            <NavBar/>
            <main>
                <div className="login-block">
                    <div className="options">
                        <div onClick={() => setIsLogin("Login")} className={isLogin === 'Login' ? "login select" : "login"}>
                            <h2>INICIAR SESIÓN</h2>

                        </div>
                        <div onClick={() => setIsLogin("Register")} className={isLogin === 'Register' ? "register select" : "register"}>
                            <h2> REGÍSTRATE</h2>

                        </div>
                        <div onClick={() => setIsLogin("Recover")} className={isLogin==='Recover' ? "recover select" : "recover"}>
                            <h2> RECUPERAR CONTRASEÑA </h2>
                        </div>
                    </div>
                    <div className="info">
                        
                        { 
                            isLogin === 'Login' ? <LoginForm 
                                                    handleIsRegister={() => setIsLogin("Register")}
                                                    handleIsRecover={() => setIsLogin("Recover")}
                                                    /> :
                            isLogin === 'Register' ? <RegisterForm handleIsLogin={() => setIsLogin("Login")}/> :
                            isLogin === 'Recover' ? <Recover handleIsLogin={() => setIsLogin("Login")}/> : <LoginForm/>
                        }     
                            
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login
