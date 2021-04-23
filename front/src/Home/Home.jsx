import React, {useEffect, useState}  from 'react'
import NavBar from '../NavBar/NavBar'
import './home.css'


const Home = () => {
    const [movies, setMovies] = useState([])
    const [posterPath, setPosterPath] = useState("https://image.tmdb.org/t/p/w300")
    // https://api.themoviedb.org/3/movie/550?api_key=7d3b7c40d4e3aa199e88e96633259b87
    const apikey = 'api_key=7d3b7c40d4e3aa199e88e96633259b87'

    useEffect(() => {
        getMovies()
        // secondCall()
    }, [])

    const getMovies = async() => {
        const res = await fetch("https://api.themoviedb.org/3/discover/movie?"+apikey+"&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
        const data = await res.json();
        setMovies(data.results)
        console.log(data.results)
    }

    // const secondCall = async() => {
    //     const res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=7d3b7c40d4e3aa199e88e96633259b87&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate")
    //     const data = await res.json();
    //     setMovies([..., data.results])
    //     // Intento de añadir 20 peliculas más a la llamada    
    // }

    return (
        <div className="home-container">
            <NavBar/>
            <main>
                <div className="home-movie-cards">
                        {
                            movies.map((movie) => 
                            // https://image.tmdb.org/t/p/w500
                                
                                <div key={movie.id}  className="home-movie-card">
                                    <div className="movie">
                                        <img src={posterPath+movie.poster_path} alt="imagen del usuario 1"/>
                                        <div className="movie-info">
                                            <span className="movie-title">{movie.title}</span>
                                            <span className="movie-overview">{movie.overview}</span>
                                        </div>
                                    </div>
                                   
                                </div> 
                            )
                        }
                </div>
            </main>
        </div>
    )
}

export default Home
