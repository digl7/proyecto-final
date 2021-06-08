import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import './list.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

import notfound from "../Placeholder-photos/nf.png"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { faTrash } from '@fortawesome/free-solid-svg-icons'


const List = () => {
    const [listName, setListName] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState('')
    var user_id = window.localStorage.getItem('user_id');
    const [error, setError] = useState(null)
    const [lists, setLists] = useState([])
    const [newName, setNewName] = useState("")
    const [isC, setC] = useState(0)
    let listLink = 'http://127.0.0.1:5000/lists/user/'+user_id
    const posterPath = "https://image.tmdb.org/t/p/w300"


    const edit = <FontAwesomeIcon style={{color: "#F9BC50", cursor:"pointer" }} icon={faEdit} />
    const trash = <FontAwesomeIcon style={{color: "#dc3545", cursor: "pointer"}} icon={faTrash} />
    
    //Lo primero que hago es obtener todas las listas que tenga ese usuario, cambio isLoading a false para que cargue la página al terminar de obtener todas las películas
    useEffect(() => {
        async function getLists() {
            const request = await axios.get(listLink)
            const data  = request.data
            setLists(data)
            setIsLoading(false)
        }
        getLists()
    }, [isLoading, isCreating, isC])


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
        setListName("")
        setIsCreating(false)
        setError('')
        }
    }   

    const handleDelete = async(list_id) =>{
        const res = await fetch("http://127.0.0.1:5000/list/delete/" +list_id, {
            method: 'DELETE',
            headers:{
                "Content-type" : "application/json",
            }
        })
        const data = await res.json()
        console.log(data)
        console.log(res.status)
        if (res.status === 201){
            //Lo uso para poder renderizar la página al borrar la lista, y no tener que hacer F5 por cada lista borrada.
            setC(isC+1)
        } else{
            alert("ha ocurrido un error, lista no borrada.")
        }
    }

    const handleEdit = async(list_id) => {
        const res = await fetch("http://127.0.0.1:5000/list/rename/" +list_id, {
            method: 'PUT',
            headers:{
                "Content-type" : "application/json",
            }, 
            body: JSON.stringify({
                'name' : newName
            })
        })
        const data = await res.json()
        if (res.status === 201){
            //Lo uso para poder renderizar la página al borrar la lista, y no tener que hacer F5 por cada lista borrada.
            setC(isC+1)
            setNewName('')
            setIsEditing('')
        } else{
            alert("ha ocurrido un error, lista no borrada.")
        }
    }

    const handleDeleteMovie = async(list_id, movie_id) => {
        console.log(list_id)
        console.log(movie_id)
        const res = await fetch("http://127.0.0.1:5000/list/"+list_id+"/delete/"+movie_id, {
            method: 'DELETE',
            headers:{
                "Content-type" : "application/json",
            }
        })
        const data = await res.json()
        if (res.status === 201){
            //Lo uso para poder renderizar la página al borrar la lista, y no tener que hacer F5 por cada lista borrada.
            setC(isC+1)
        } else{
            alert("ha ocurrido un error, pelicula no borrada.")
        }

    }

    return (
        <div className="list-container">
            <NavBar/>    
            <main>
                <div className="mylists">

                    <ul> 
                        {/* Si está logado y está cargando muestra el mensaje "Cargando tus listas", Si no está cargando y no estás creando una lista y estás logeado, muestra el mensaje de "Crear lista" si no estás logeado muestra el mensaje de Iniciar sesión. Y si antes no estas logeado desde el principio muestra el mensaje de Iniciar sesión */}
                        {user_id ? isLoading ? "Cargando tus listas" : !isCreating ? <li className="listCreate" onClick={() => setIsCreating(true)}> {user_id ? "Crear lista" : <Link to="/login"> Iniciar sesión </Link> }  </li> :null : <li className="listCreate"> <Link to="/login"> Iniciar sesión </Link>   </li>}
                        {isCreating ?  <form onSubmit={createList} >
                            <input 
                                type="text"
                                placeholder="Título de la lista"
                                onChange={(e) => setListName(e.target.value)}
                                value={listName}
                            />
                            {error}
                            <button className="createList" type="submit">Crear Lista</button>
                        </form> : null
                        } 
                        {/* Todas las listas en la barra de navegación */}
                        {
                            lists.map((list) =>
                                <li key={list.id}>  <a href={`#`+list.id}>{list.name} </a></li> 
                            )
                        }
                    
                    </ul>
                </div>

                {/* Todas las listas en el body, y dentro sus películas */}

                {
                    lists.map((list) =>
                        <div key={list.id} className="list-content">

                            <span id={list.id} className="list-title"> 
                            {isEditing === list.id ? <input 
                                type="text" 
                                placeholder={list.name} 
                                onChange={(e) => setNewName(e.target.value)} 
                                value={newName}/> 
                                :
                            list.name}  
                            {isEditing && <span onClick={() => handleEdit(list.id)}> {edit} </span> }
                            <span onClick={() => handleDelete(list.id)}> {trash} </span> </span>
                            <div className="option">

                                {/* Cuando das click se cambia al estado contrario. Empieza en false. */}
                                { isEditing === '' ? <span  onClick={() => setIsEditing(list.id)} className="list-edit" > Editar </span> : <span className="list-edit" onClick={() => setIsEditing("")}> Parar de editar </span> }
                                <div className="movies">
                                {
                                    list.movie !== undefined ?
                                    list.movie.map((movie)=>
                                    <div key={movie.id}> 
                                        <Link  to={`/movie/${movie.id}`}>
                                            <div className="home-movie-card">
                                                <div className="movie">
                                                    <img src={ movie.poster_path === null ? notfound : posterPath+movie.poster_path} alt=""/>
                                                    <div className="movie-info">
                                                        <span className="movie-title">{movie.title}</span>
                                                        <span className="movie-overview">{ movie.overview === "" ?  "No hay descripción de esta película" : movie.overview}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        {isEditing && <span onClick={() => handleDeleteMovie(list.id, movie.id)} > Eliminar película {trash} </span> }
                                    
                                    </div>
                                    ) : <span>¡No tienes ninguna película, añade alguna! Prueba aquí: <Link className="yellow" to="/">Home</Link>, o aquí: <Link className="yellow" to="/filter">Filtrar</Link></span>
                                }
                                </div>
                            </div>
                        </div>
                    ) 
                }
            </main>
        </div>
    )
}

export default List
