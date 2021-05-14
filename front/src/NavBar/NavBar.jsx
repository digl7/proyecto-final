import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import big_logo from "../Placeholder-photos/big_logo2.svg"
import logo from "../Placeholder-photos/logo.png"

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const NavBar = (props) => {
    var user_id = window.localStorage.getItem('user_id');
    var user_name = window.localStorage.getItem('user_name');
    var access_token = window.localStorage.getItem('access_token');
    var linkLogout = 'http://127.0.0.1:5000/user/logout'
    
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

    const handleLogout = async() =>{
        const res = await fetch(linkLogout, {
            method: "POST",
            headers: {
            "Authorization": access_token
            }
        });
        if (res.status === 200){
            localStorage.clear();
            window.location.reload()
        }
        if (res.status === 401){
            alert("Tu sesión ha caducado y esto no puede pasar.. //TODO: hacerlo infinito")
            localStorage.clear();
            window.location.reload()
        }
    }


    return (
        <div className="navbar-container">
            <header>
                <nav>
                    <ul>
                        <li> 
                            <Link onClick={props.handleSearch} to ="/">
                                <img 
                                    className="logo" 
                                    alt="Logo, volver al home" 
                                    srcSet={logo} 
                                    alt=""
                                    />
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
                            <li className="filtrar"><Link to="/filter"> Filtrar</Link></li>
                            <li className="myList"><Link to ={`/list/${user_id}`}> Mi lista</Link></li>
                            {/* Si hay cualquier usuario conectado, le muestra ese usuario, sino muestra la opción de INICIAR SESIÓN */}
                            {user_id ?
                            <>
                             <li className="login"> <Link to="/login"> {user_name} </Link> </li>
                             <li className="logout" onClick={handleLogout}  >Logout</li>
                            </>
                            : 
                            <li className="login"> <Link to="/login"> Iniciar sesión </Link> </li>
                            }
                            <li>{bars}</li>

                            {/* MENÚ DEL MÓVIL AL HACER CLICK */}

                            <div id="menu-open"  className="movil-menu">
                                <ul className="movil-container-menu">
                                     {times}
                                     {/* to={`/movie/${movie.id}`}> */}
                                    <li onClick={closeMenu} > <Link to="/"> Inicio </Link> </li>
                                    <li onClick={closeMenu} > <Link to="/filter"> Filtrar </Link>  </li>
                                    <li onClick={closeMenu} > <Link to ={`/list/${user_id}`}> Mi lista</Link></li>
                                    {
                                        user_id ? <li onClick={handleLogout} >Logout</li> 
                                        :
                                        <li onClick={props.handleIsLogin}> <Link  to="/login"> Iniciar sesión </Link> </li>
                                    }


                                    <li onClick={props.handleIsRegister}> <Link to="/login"> Regístrate </Link> </li>
                                    <li onClick={props.handleIsRecover}> <Link to="/login"> Activar Email </Link> </li>
                                </ul>
                            </div>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default NavBar
