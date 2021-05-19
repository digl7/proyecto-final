import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import './list.css'
import axios from 'axios'
import {Link} from 'react-router-dom'


const List = () => {
    const [isLoading, setIsLoading] = useState(true)
    var user_id = window.localStorage.getItem('user_id');
    const [lists, setLists] = useState([])
    let listLink = 'http://127.0.0.1:5000/lists/'+user_id
    const posterPath = "https://image.tmdb.org/t/p/w300"
    
    useEffect(() => {
        async function getLists() {
            const request = await axios.get(listLink)
            const data  = request.data
            setLists(request.data)
            setIsLoading(false)
        }
        getLists()
    
    }, [isLoading])

    const createList = async() => {
        const res = await fetch("http://127.0.0.1:5000/list/"+user_id, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                'name' : 'pru1'
            })
        })
        const data = await res.json()
        console.log(data)
    }

    return (
        <div className="list-container">
            <NavBar/>    
            <main>
                <div className="mylists">
                    <ul>
                        <li onClick={createList}>Crear lista</li>
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
                                <span>Editar - icono</span>
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
                                    ) : <span>¡No tienes ninguna película añadida!</span>
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
