import React, {useState} from 'react'
import NavBar from '../NavBar/NavBar'
import './login.css'
import LoginForm from './LoginForm'
import RegisterForm from '../Register/RegisterForm'
import Recover from '../Recover/Recover'

const Login = () => {
    //Estado que va cambiando entre login, register y recover para css y para llamar a los componentes LoginForm.jsx, RegisterForm.jsx y Recover.jsx
    const [isLogin, setIsLogin] = useState("Login")

    const closeMenu = () =>{
        document.getElementById("menu-open").style.width= "0";
    }


    //si das click en una opción (en el menú del móvil) isLogin cambia a esa opción y se cierra el menú.
    const closeClick = (option) =>{
        setIsLogin(option)
        closeMenu()
    }

    return (
        <div className="login-container">
            {/* Los props que vienen de la barra de navegación (el menú móvil) */}
            <NavBar 
                handleIsLogin={() => closeClick("Login") }
                handleIsRegister={() => closeClick("Register")}
                handleIsRecover={() => closeClick("Recover")}
            />

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
                            <h2> ACTIVAR EMAIL </h2>
                        </div>
                    </div>
                    <div className="info">
                    {/* Props que vienen de LoginForm, RegisterForm y Recover, para cambiar el estado de isLogin y poder cambiar entre las diferentes pestañas */}
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
