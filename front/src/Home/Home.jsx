import React, {useEffect, useState}  from 'react'
import NavBar from '../NavBar/NavBar'
import './home.css'


const Home = () => {
    const [movies2, setMovies2] = useState([])
    const [page, setPage] = useState(1)
    const [movies, setMovies] = useState([])
    const [posterPath, setPosterPath] = useState("https://image.tmdb.org/t/p/w300")
    const apikey = 'api_key=7d3b7c40d4e3aa199e88e96633259b87'

    // useEffect(() => {
    //     handleIncrement()
    // }, [])

    // const handleIncrement = () => {
    //     setPage(prevCount => prevCount + 1);
    //     console.log(page)
    //   };

    // const handleDecrement = () => {
    //     setPage(prevCount => prevCount - 1);
    //     console.log(page)
    // };

    useEffect(() => {
        getMovies()
        
    }, [])

    const getMovies = async() => {
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
        //  Intento de añadir 20 peliculas más a la llamada    
    }


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
                                        <img src={posterPath+movie.poster_path} alt=""/>
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
