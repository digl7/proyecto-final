import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import './filter.css'
import axios from 'axios'
import {Link} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Filter = () => {

    const [isLoading, setIsLoading] = useState(true)
    let api_key = "api_key=7d3b7c40d4e3aa199e88e96633259b87" 

    let genresLink = "https://api.themoviedb.org/3/genre/movie/list?"+api_key+"&language=es-ES"//búsqueda de los géneros
    const [genres, setGenres] = useState([]) //lista de todos los géneros de la api
    const [isHidden, setIsHidden] = useState(false) //para mostrar los géneros
    var genreListChecked = '' //string con todos los géneros checked === true
   
    const [search, setSearch] = useState('')
    const posterPath = "https://image.tmdb.org/t/p/w300"
    const [movies, setMovies] = useState([])
    let movieSearch = "" //enlace para buscar después en la llamada api

    const down = <FontAwesomeIcon className="" icon={faCaretDown} />
    const searchIcon = <FontAwesomeIcon className="" icon={faSearch} />


    const handleSubmitSearch = (e) =>{
        e.preventDefault()
    }

    useEffect(() => {
        getGenres()
        
    }, [movies])

    const getGenres = async() => {
        const request = await axios.get(genresLink)
        setGenres(request.data.genres)
        setIsLoading(false)

    }
    const handleDisplay = () =>{
        setIsHidden(!isHidden)
    }

    const getGenresChecked = () => {
        const checkboxes = document.querySelectorAll('input[name="genres"]:checked');
            checkboxes.forEach((checkbox, i) => {
                if (i === 0){
                    genreListChecked = checkbox.id
                } else{
                    genreListChecked += "%2C"+checkbox.id
                }
        });
        movieSearch = "https://api.themoviedb.org/3/discover/movie?"+api_key+"&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="+genreListChecked+"&with_watch_monetization_types=flatrate"
        searchMovies()
    }
    
    const searchMovies = async() =>{
        const request = await axios.get(movieSearch)
        .then(resp => {
            setMovies(resp.data.results)  
        } 
        )
        return request
    }

    return (
        <div className="filter-container">
            <NavBar/>
            {!isLoading && 
            <main>
                <div className="content">
                    <div className="main-search">
                        <form onSubmit={handleSubmitSearch} role="search" action="">
                            <label htmlFor="search"></label>
                            <input 
                                placeholder="Buscar..."
                                name="search"
                                type="text" 
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                            <button type="submit"  className="search-button"> {searchIcon}</button>
                            <button onClick={handleDisplay} className="advanced"> Avanzados {down} </button>
                        </form>
                    </div>
                    <div className= {isHidden ? "hidden-content visible" : "hidden-content" } >
                        <form>
                            {
                                genres.map((genre) => 
                                <div key={genre.id} className="checkbox-content">
                                    <input id={genre.id} name="genres" value={genre.id} type="checkbox" /> 
                                    <span className="genre-name"> {genre.name}  </span>
                                </div>
                                )
                            }

                        </form>
                        <button onClick={getGenresChecked} className="search-button">buscar</button>
                    </div>
                    <div className="home-movie-cards"> 
                        {
                            movies.length === 0 ? <span style={{margin: "auto"}}> No hay ninguna película con esos géneros. </span> : 
                            movies.map((movie)=>
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
                            )
                        }

                    </div>
                </div>
            </main>
        }
        </div>
    )
}

export default Filter
