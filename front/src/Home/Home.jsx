import React, {useEffect, useState }  from 'react'
import NavBar from '../NavBar/NavBar'
import {
    Link
  } from "react-router-dom";
import './home.css'
import axios from 'axios';


const Home = () => {
    // Página de la api:  https://developers.themoviedb.org/3/getting-started/introduction
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1) //Le sumo +1 cuando se da click en "cargas más"
    const [movies, setMovies] = useState([]) //lista inicial de 20 películas (máximo de peliculas por llamada a la api)
    const [search, setSearch] = useState('')


    const posterPath = "https://image.tmdb.org/t/p/w300"
    const apikey = 'api_key=7d3b7c40d4e3aa199e88e96633259b87' 
    const link = "https://api.themoviedb.org/3/discover/movie?"+apikey+"&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page="+page+"&with_watch_monetization_types=flatrate"
    

    //UseEffect para la carga de peliculas cuando entras a la página y cuando le das al botón de cargar más.
    useEffect(() => {
        getMovies()

    }, [page])

    const getMovies = async() => {
        const request = await axios.get(link)
        .then(resp => {
            if (search === '' && page == 1){
                setPage(1)
                setMovies(resp.data.results)
            } else{
                //y sino está vacía uno la lista de películas con la siguiente. Es decir [peli1, peli2] + [peli3, peli4] = [peli1, peli2, peli3, peli4]
                setMovies(movies => [...movies, ...resp.data.results])
            }
        })

        //isLoading a false para que cuando termine de hacer toda la petición le de tiempo al render cargarlo bien. 
        setIsLoading(false)
        return request
    }

    const loadMore = () => {
        setPage(page+1)
    }


    /* Búsqueda de peliculas */
    const searchMovie = async() => { //Busco las peliculas de esta forma: calificación promedio y número de votos.
        if (search !== ''){ 
            const res = await fetch("https://api.themoviedb.org/3/search/movie?"+apikey+"&language=es-ES&query="+search+"&page=1&include_adult=false")
            const data = await res.json();
            setMovies(data.results)
        } else{
            setPage(1)
            setMovies([])
            getMovies()

        }
    }

    //si la búsqueda no está vacía llamo a la api de search con lo que hayamos buscado.
    useEffect(() => {
        searchMovie() 
    }, [search])

    return (
        <div className="home-container">        
            <NavBar
                handleSearch = {() => setSearch("")}
                handleChange = {(e) => setSearch(e.target.value)}
            />;
            {/* Cuando loading sea false (al terminar la llamada api) se renderiza el main */}

            { !isLoading && 
            
            <main>
                {/* Cuando entreas a la página principal (home, /) autofocus a la barra de búsqueda.  */}
                {document.getElementById("search").focus()}
                { console.log(movies) }
                <div className="home-movie-cards">                        
                        { 
                            movies.map((movie) => 
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

                <div className="home-page-button">
                    <button onClick={() => loadMore()}> Cargar mas </button>
                </div>
                
            </main>
            }

        </div>
    )
}

export default Home
