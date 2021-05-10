import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from "../Placeholder-photos/logo2.png"

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const NavBar = (props) => {

    const openMenu = () =>{
        document.getElementById("menu-open").style.display="block";
        document.getElementById("menu-open").style.width= "100%";
    }

    const closeMenu = () =>{
        document.getElementById("menu-open").style.width= "0";
    }

    const bars = <FontAwesomeIcon onClick={openMenu} className="hamburger-menu" icon={faBars} />
    const times = <FontAwesomeIcon onClick={closeMenu} className="yellow times" icon={faTimes} />



    return (
        <div className="navbar-container">
            <header>
                <nav>
                    <ul>
                        <li> <Link onClick={props.handleSearch} to ="/"><img className="logo" alt="Logo, volver al home" src={logo} alt=""/></Link></li>
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
                            
                            <li className="login"> <Link to="/login"> Iniciar sesión </Link> </li>
                            <li>{bars}</li>

                            {/* MENÚ DEL MÓVIL AL HACER CLICK */}

                            <div id="menu-open"  className="movil-menu">
                                <ul className="movil-container-menu">
                                     {times}
                                    <li onClick={closeMenu} > <Link to="/"> Inicio </Link> </li>
                                    <li onClick={closeMenu} >Filtrar</li>
                                    <li onClick={closeMenu} >Mi lista</li>
                                    <li onClick={props.handleIsLogin}> <Link  to="/login"> Iniciar sesión </Link> </li>
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
