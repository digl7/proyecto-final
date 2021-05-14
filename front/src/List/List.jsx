import React from 'react'
import NavBar from '../NavBar/NavBar'
import './list.css'

const List = () => {
    return (
        <div className="list-container">
            <NavBar/>            
            <main>
                <div className="mylists">
                    <ul>
                        <li>CREAR LISTA</li>
                    </ul>
                </div>

                <div className="list-content">
                    <div className="option">
                        <span>Editar - icono</span>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default List
