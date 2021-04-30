import React, {useEffect, useState}  from 'react'
import NavBar from '../NavBar/NavBar'
import './home.css'


const Home = () => {
    // Página de la api:  https://developers.themoviedb.org/3/getting-started/introduction
    const [movies2, setMovies2] = useState([]) // Uso esto para poder sumar las listas [peli1,peli2] + [peli3,peli4] = [peli1,peli2,peli3,peli4]
    const [page, setPage] = useState(1) //Le sumo +1 cuando se da click en "cargas más"
    const [movies, setMovies] = useState([]) //lista inicial de 20 películas (máximo de peliculas por llamada a la api)

    const [search, setSearch] = useState('')
    console.log(search)

    const [posterPath, setPosterPath] = useState("https://image.tmdb.org/t/p/w300")
    const apikey = 'api_key=7d3b7c40d4e3aa199e88e96633259b87' 

    //UseEffect para la carga de peliculas cuando entras a la página o cuando le das al botón de cargas más.
    useEffect(() => {
        getMovies()
    }, [])

    const getMovies = async() => { //Busco las peliculas de esta forma: calificación promedio y número de votos (automaticamente hecho por la api)
        const res = await fetch("https://api.themoviedb.org/3/discover/movie?"+apikey+"&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page="+page+"&with_watch_monetization_types=flatrate")
        const data = await res.json();
        setMovies(data.results)
        setPage(page+1)
    }

    const secondCall = async() => {
        const res = await fetch("https://api.themoviedb.org/3/discover/movie?"+apikey+"&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page="+page+"&with_watch_monetization_types=flatrate")
        const data = await res.json();
        console.log(data)
        setMovies2(data.results)
        setMovies([...movies, ...movies2])
        setPage(page+1)
    }

    /* Búsqueda de peliculas */
    const searchMovie = async() => { //Busco las peliculas de esta forma: calificación promedio y número de votos (automaticamente hecho por la api)
        setPage(1)
        if (search == ''){
            getMovies()
        } else{
            const res = await fetch("https://api.themoviedb.org/3/search/movie?"+apikey+"&language=es-ES&query="+search+"&page=1&include_adult=false")
            const data = await res.json();
            setMovies(data.results)
        }
    }

    // Cada vez que escribo algo en el input de búsqueda ejecuto la llamada a la api.
    useEffect(() => {
        searchMovie()
    }, [search])


    return (
        <div className="home-container">        
            <NavBar
                handleChange = {(e) => setSearch(e.target.value)}
            />;
            <main>
                <div className="home-movie-cards">                        
                        {
                            movies.map((movie) => 
                            
                                <div key={movie.id}  className="home-movie-card">
                                    <div className="movie">
                                        {console.log(movie.poster_path) }
                                        <img src={ movie.poster_path === null ? "nf.png" : posterPath+movie.poster_path} alt=""/>
                                        <div className="movie-info">
                                            <span className="movie-title">{movie.title}</span>
                                            <span className="movie-overview">{ movie.overview == "" ?  "No hay descripción de esta película" : movie.overview}</span>
                                        </div>
                                    </div>
                                </div> 
                            ) 
                        }
                </div>

                <div className="home-page-button">
                    <button onClick={() => secondCall()} >cargar mas</button>
                </div>
            </main>
            

        </div>
    )
}

export default Home
