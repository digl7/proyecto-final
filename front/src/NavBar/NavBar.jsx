import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import big_logo from "../Placeholder-photos/big_logo.svg"
import small_logo from "../Placeholder-photos/small_logo.svg"

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const NavBar = (props) => {
    var user_id = window.localStorage.getItem('user_id');
    var user_name = window.localStorage.getItem('user_name');
    
    const openMenu = () =>{
        document.getElementById("menu-open").style.display="block";
        document.getElementById("menu-open").style.width= "100%";
    }

    const closeMenu = () =>{
        
        document.getElementById("menu-open").style.display="none";
        document.getElementById("menu-open").style.width= "0";

    }
    
    const bars = <FontAwesomeIcon onClick={openMenu} className="hamburger-menu" icon={faBars} />
    const times = <FontAwesomeIcon onClick={closeMenu} className="yellow times" icon={faTimes} />

    //Para manejar el CSS del navbar y que funcione bien el menú desplegable al cambiar de responsive móvil -> escritorio.
    const handleResize = () => {
        if (window.innerWidth > 1280) {
            document.getElementById("menu-open").style.display="none";
            document.getElementById("menu-open").style.width= "0";
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })




    return (
        <div className="navbar-container">
            <header>
                <nav>
                    <ul>
                        <li> 
                            <Link onClick={props.handleSearch} to ="/">
                                <img className="logo" alt="Logo, volver al home" srcSet={big_logo} alt=""/>
                            </Link>
                        </li>
                            <li className="navbar-search"> 
                            <Link to="/">
                                <label htmlFor="search"></label>
                                <input 
                                    id="search"
                                    className="search"
                                    alt="Busca una película" 
                                    name="search" 
                                    placeholder="Buscar... " 
                                    type="text"
                                    onChange={props.handleChange}
                                  
                                /> 
                            </Link>
                            </li>
                            <li className="filtrar">Filtrar</li>
                            <li className="myList">Mi lista</li>
                            {/* Si hay cualquier usuario conectado, le muestra ese usuario, sino muestra la opción de INICIAR SESIÓN */}
                            {user_id ? 
                             <li className="login"> <Link to="/login"> {user_name} </Link> </li>
                            : 
                            <li className="login"> <Link to="/login"> Iniciar sesión </Link> </li>
                            }
                            <li>{bars}</li>

                            {/* MENÚ DEL MÓVIL AL HACER CLICK */}

                            <div id="menu-open"  className="movil-menu">
                                <ul className="movil-container-menu">
                                     {times}
                                    <li onClick={closeMenu} > <Link to="/"> Inicio </Link> </li>
                                    <li onClick={closeMenu} >Filtrar</li>
                                    <li onClick={closeMenu} >Mi lista</li>

                                    {
                                        user_id ? <li onClick={props.handleIsLogin}> <Link  to="/login"> {user_name} </Link> </li> 
                                        :
                                        <li onClick={props.handleIsLogin}> <Link  to="/login"> Iniciar sesión </Link> </li>
                                    }


                                    <li onClick={props.handleIsRegister}> <Link to="/login"> Regístrate </Link> </li>
                                    <li onClick={props.handleIsRecover}> <Link to="/login"> Recuperar contraseña </Link> </li>
                                </ul>
                            </div>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default NavBar
