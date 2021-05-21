import React, {useState, useEffect} from 'react'
import './moviepage.css'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
import notfound from "../Placeholder-photos/nf.png"
import noavatar from "../Placeholder-photos/no_avatar.jpg"

import Moment from 'react-moment';
import 'moment-timezone';
import {  Link } from "react-router-dom";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus } from '@fortawesome/free-solid-svg-icons'


const MoviePage = () => {  
    //Input del comentario 
    const [inputComment, setInputComment] = useState('') 
    //Todos los comentarios de la pelicula
    const [comments, setComments] = useState([])
    const [error, setError] = useState('')
    const [lists, setLists] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    
    var user_id = window.localStorage.getItem('user_id');
    
    let posterPath = "https://image.tmdb.org/t/p/w500" //El poster con mas calidad
    let profilePhoto = "https://image.tmdb.org/t/p/w300" //Foto de perfil de cada actor
    let background = "https://themoviedb.org/t/p/w1920_and_h800_multi_faces/" //Foto de background
    const [isLoading, setIsLoading] = useState(true) //Espero a que los datos llegen a el useEffect, sino me daba undefined en otros estados
    const [movie, setMovie] = useState([])    
    const [cast, setCast] = useState([])  
    const [genres, setGenres] = useState([])


    const apikey = 'api_key=7d3b7c40d4e3aa199e88e96633259b87'
    let id = window.location.href.split("/movie/")[1] // ID de la película en la que das click
    let search = "https://api.themoviedb.org/3/movie/"+id+"?"+apikey+"&language=es-ES&append_to_response=credits"
    let searchComments = "http://127.0.0.1:5000/comment/view/"+id
    let commentCreate = "http://127.0.0.1:5000/comment/"+user_id


    let listLink = 'http://127.0.0.1:5000/lists/user/'+user_id


    const plus = <FontAwesomeIcon icon={faPlus} />

    useEffect(() => {
        async function getMovie() {
            const request = await axios.get(search)
            setMovie(request.data) 
            setCast(request.data.credits.cast)
            setGenres(request.data.genres)
            setIsLoading(false)
            return request
        }
        getMovie()
        getComments()
        getLists()

    }, []) 

    const getComments = async ()=> {
        const request = await axios.get(searchComments)
        setComments(request.data)
    }

    const sendComment = async() => {

        if(inputComment===""){
            console.log(user_id)
            setError("¡Escribe algo!")
        }else{
            let config = {text: inputComment,external_id: id}
            const request = await axios.post(commentCreate, config)
            console.log(request)
            setError("")
            setInputComment("")
            getComments()
        }
        
        
    }

    const getLists = async() => {
        const request = await axios.get(listLink)
        const data  = request.data
        console.log(request.data)
        setLists(data)
    }

    const addMovie = async(e) => {
        var list_id = e.target.id
        const res = await fetch("http://127.0.0.1:5000/movie/"+list_id, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                'external_id' : id
            })
        }
        )
        if (res.status === 500){
            alert("peli repetida")
        }
    }

 
    return (

        <div className="moviePage-container">
            <NavBar/>
            { !isLoading && 
            <main>
                <div className="movie-container" style={{backgroundImage: "url(" + background + movie.backdrop_path + ")"}}>
                    <div className="movie-info">
                    <div className="movie-poster">
                    <img src={ movie.poster_path === null ? notfound : posterPath+movie.poster_path} alt="Poster de la película"/>
                    </div>
                    <div className="movie-all">
                        <div className="movie-title">
                            <span>{movie.title} | </span>
                            <span>{movie.release_date.split("-")[0]}</span>
                            <button onClick={() => setIsAdding(!isAdding)} > {!isAdding ? "Añadir a mi lista" : "Cancelar"}  </button>
                        </div>

                        <div className="movie-genres">
                                { 
                                    genres.map((genre, i) =>
                                    // Última posicion termina con punto.
                                        <span key={genre.id} > {genres.length === i + 1 ? genre.name+"." : genre.name+", "  } </span>
                                    ) 
                                }
                        </div>
                        <div className="movie-description">
                            {/* CONDICIÓN DE ISADDING LISTAS */}
                            {    !isAdding ?  
                            
                                <p>{movie.overview === '' ? "No hay información de esta película." : movie.overview }</p>    

                                : 
                                lists.length === 0 ? <span> No tienes ninguna lista creada, ¡ve a <Link to={`/list/${user_id}`} className="yellow">mi listas</Link> para crear una! </span> :
                                lists.map((list)=>
                                    <div key={list.id} className="list">
                                        <span> {list.name} </span> <button id={list.id} onClick={(e) => addMovie(e)} className="addToList">Añadir</button>
                                    </div>
                                )   
                            }
                           
                        </div>
  
                    </div>
                </div>
                </div>

                <div className="movie-cast-container">
                    <h2>Reparto principal</h2>
                    <div className="movie-cast">
                        {
                            cast.length === 0 
                                ? 
                                <span>No hay información sobre los actores de esta película</span>
                                :
                                cast.map((act) => 
                                    <div key={act.id} className="movie-cast-card">
                                    <img src={act.profile_path === null ? noavatar : profilePhoto + act.profile_path} alt=""/>
                                        <span>{act.name} </span>
                                    </div>
                            )
                        }
                    </div>
                </div>
                <div className="movie-comments">
                    <div className="left">
                        <h2>Comentarios</h2>
                            {comments.length === 0 && <p>No hay ningún comentario. ¡Di algo!</p>}
                            <label htmlFor="inputComment">¡Escribe tu comentario!</label>
                            <textarea
                                rows="8"
                                type="text" 
                                name="inputComment"
                                onChange={(e) => setInputComment(e.target.value)}
                                value={inputComment}
                            />
                            <span className="error">{error}</span> 
                            {user_id ? 
                            <input type="button" className="sendComment" onClick={sendComment} value="ENVIAR" />
                            :
                            
                            <Link to="/login" className="sendComment">INICIA SESIÓN</Link>
                            }
                    </div>
                    <div className="right">
                        {
                            comments.map((comment) =>
                            <div key={comment.id} className="comment">

                                <div className="comment-username">
                                    <span>{comment.user.username} - </span>
                                    <span><Moment fromNow>{comment.timestamp}</Moment></span>
                                </div>

                                <div className="comment-timestamp">
                                    <span></span>
                                </div>

                                <div className="comment-text">
                                    <span>{comment.text}</span>
                                </div>

                            </div>
                        )
                        }
                    </div>
                </div>
                
            </main>
            }
        </div>
    )
}

export default MoviePage
