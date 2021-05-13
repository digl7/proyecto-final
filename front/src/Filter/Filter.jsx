import React, {useState} from 'react'
import NavBar from '../NavBar/NavBar'
import './filter.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Filter = () => {
    const [search, setSearch] = useState('')
    const handleSubmit = (e) =>{
        e.preventDefault()
    }
    const down = <FontAwesomeIcon className="" icon={faCaretDown} />
    const searchIcon = <FontAwesomeIcon className="" style={{color:'white'}} icon={faSearch} />

    return (
        <div className="filter-container">
            <NavBar/>
            <main>
                <div className="content">
                    <div className="main-search">
                        <form onSubmit={handleSubmit} role="search" action="">
                            <label htmlFor="search"></label>
                            <input 
                                placeholder="Buscar..."
                                name="search"
                                type="text" 
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                            <input type="submit" className="search-button" value="🔍" />
                            <button className="advanced"> Avanzados {down} </button>
                        </form>
                    </div>
                    <div className="hidden-content"></div>
                </div>
            </main>
            
        </div>
    )
}

export default Filter
