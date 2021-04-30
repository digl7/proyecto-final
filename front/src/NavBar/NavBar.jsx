import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'


const NavBar = (props) => {
    const [search, setSearch] = useState('')
    console.log(search)
    return (
        <div className="navbar-container">
            <header>
                <nav>
                    <ul>
                        <li> <Link to ="/"><img className="logo" alt="Logo, volver al home" src="logo.png" alt=""/></Link></li>
                        <li className="navbar-search"> 
                            <label htmlFor="search"></label>
                            <input 
                                alt="Busca una película" 
                                name="search" 
                                placeholder="Buscar... " 
                                type="text"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            /> 
                        </li>
                        <li>Filtrar</li>
                        <li>Mi lista</li>
                        
                        <li> <Link to="login"> Iniciar sesión </Link> </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default NavBar
