import React, {useState, useEffect, Fragment} from 'react'
import NavBar from '../NavBar/NavBar'
import './list.css'
import axios from 'axios'
import {Link} from 'react-router-dom'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { faTrash } from '@fortawesome/free-solid-svg-icons'


const List = () => {
    const [listName, setListName] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    var user_id = window.localStorage.getItem('user_id');
    const [error, setError] = useState(null)
    const [lists, setLists] = useState([])
    let listLink = 'http://127.0.0.1:5000/lists/'+user_id
    const posterPath = "https://image.tmdb.org/t/p/w300"


    const edit = <FontAwesomeIcon icon={faEdit} />
    
    const trash = <FontAwesomeIcon icon={faTrash} />
    

    useEffect(() => {
        async function getLists() {
            const request = await axios.get(listLink)
            const data  = request.data
            setLists(data)
            setIsLoading(false)
        }
        getLists()
    
    }, [isLoading])


    const createList = async(e) => {
        e.preventDefault()
        if (listName === ''){
            setError("¡Escribe algo!")
        } else{ 
        const res = await fetch("http://127.0.0.1:5000/list/"+user_id, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                'name' : listName
            })
        })
        const data = await res.json()
        console.log(data)
        setListName("")
        setIsCreating(false)
        setError('')
        }
    }   

    return (
        <div className="list-container">
            <NavBar/>    
            {!isLoading &&
            <main>

                <div className="mylists">
                    <ul>
                     {!isCreating ? 
                        <li className="listCreate" onClick={() => setIsCreating(true)}  >  Crear lista</li>
                        :
                        <form onSubmit={createList} >
                            <input 
                                type="text"
                                onChange={(e) => setListName(e.target.value)}
                                value={listName}
                            />
                            {error}
                            <button className="createList" type="submit">Crear Lista</button>
                        </form>
                        }
                        {
                            lists.map((list) =>
                                <li key={list.id}>  <a href={`#`+list.id}>{list.name} </a></li> 
                            )
                        }
                        
                    </ul>
                </div>
                {
                    lists.length===0 ? <span>¡No tienes ninguna lista creada!</span> : null
                }
                {
                    lists.map((list) =>
                        <div key={list.id} className="list-content">

                            <span id={list.id} className="list-title"> {list.name} </span>
                            <div className="option">
                                {/* Cuando le das click se cambia al estado contrario. Empieza en false. */}
                               
                                <span  onClick={() => setIsEditing(!isEditing)} className="list-edit" > {isEditing ? "Parar de editar":"editar" } </span>             
                                <div className="movies">
                                {
                                    list.movie !== undefined ?
                                    list.movie.map((movie)=>
                                    <Link key={movie.id} to={`/movie/${movie.id}`}>
                                        <div className="home-movie-card">
                                            <div className="movie">
                                                <img src={ movie.poster_path === null ? "nf.png" : posterPath+movie.poster_path} alt=""/>
                                                <div className="movie-info">
                                                    <span className="movie-title">{movie.title}</span>
                                                    <span className="movie-overview">{ movie.overview === "" ?  "No hay descripción de esta película" : movie.overview}</span>
                                                </div>
                                            </div>
                                        </div> 
                                    </Link>
                                    ) : <span>¡No tienes ninguna película, añade alguna!</span>
                                }
                                </div>
                                
                            </div>
                        
                        </div>
                    ) 
                }
                
            </main>
            }   

            
        </div>
    )
}

export default List
