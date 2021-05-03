import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'

import logo from "../Placeholder-photos/logo.png"

const NavBar = (props) => {
    

    return (
        <div className="navbar-container">
            <header>
                <nav>
                    <ul>
                        <li> <Link to ="/"><img className="logo" alt="Logo, volver al home" src={logo} alt=""/></Link></li>
                        <li className="navbar-search"> 
                            <label htmlFor="search"></label>
                            <input 
                                alt="Busca una película" 
                                name="search" 
                                placeholder="Buscar... " 
                                type="text"
                                onChange={props.handleChange}
                            /> 
                        </li>
                        <li>Filtrar</li>
                        <li>Mi lista</li>
                        
                        <li> <Link to="/login"> Iniciar sesión </Link> </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default NavBar
