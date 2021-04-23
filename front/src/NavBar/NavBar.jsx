import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'

const NavBar = () => {
    return (
        <div className="navbar-container">
            <nav>
                <ul>
                    <li> <Link to ="/"><img className="logo" src="logo.png" alt=""/></Link></li>
                    <li>Buscar</li>
                    <li>Filtrar</li>
                    <li>Mi lista</li>
                    <li> <Link to="login"> Iniciar sesión </Link> </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
