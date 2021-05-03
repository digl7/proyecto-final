import React, {useState, useEffect} from 'react'
import './moviepage.css'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'



const MoviePage = () => {  
    
    let posterPath = "https://image.tmdb.org/t/p/w500" //El poster con mas calidad
    let profilePhoto = "https://image.tmdb.org/t/p/w300" //Foto de perfil de cada actor
    const [isLoading, setIsLoading] = useState(true) //Espero a que los datos llegen a el useEffect, sino me daba undefined en otros estados
    const [movie, setMovie] = useState([])    
    const [cast, setCast] = useState([])  
    const [genres, setGenres] = useState([])


    const apikey = 'api_key=7d3b7c40d4e3aa199e88e96633259b87'
    let id = window.location.href.split("/movie/")[1] // ID de la película en la que das click
    let search = "https://api.themoviedb.org/3/movie/"+id+"?"+apikey+"&language=es-ES&append_to_response=credits"

    // https://api.themoviedb.org/3/movie/460465?api_key=7d3b7c40d4e3aa199e88e96633259b87&append_to_response=credits mortal kombat json (prueba)

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

    }, []) 


    return (

        <div className="moviePage-container">
            <NavBar/>
            { !isLoading && 
            <main>
                <div className="movie-container">
                    <div className="movie-info">
                    <div className="movie-poster">
                    <img src={ movie.poster_path === null ? "nf.png" : posterPath+movie.poster_path} alt="Poster de la película"/>
                    </div>
                    <div className="movie-all">
                        <div className="movie-title">
                            <span>{movie.title} | </span>
                            <span>{movie.release_date.split("-")[0]}</span>
                            <button>Añadir a mi lista</button>
                            <button>Comentarios / Valorar</button>
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
                            <p>{movie.overview}</p>
                        </div>
  
                    </div>
                </div>
                </div>
                <div className="movie-cast-container">
                    <h2>Reparto principal</h2>
                    <div className="movie-cast">
                        {
                            cast.map((act) => 
                                <div className="movie-cast-card">
                                <img src={act.profile_path === null ? "nf.png" : profilePhoto + act.profile_path} alt=""/>
                                <span>{act.name}</span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="movie-comments">
                    <h2>Comentarios (18)</h2>
                    
                    <div className="comment">
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere temporibus consequuntur 
                            praesentium nostrum nihil quaerat reprehenderit, iusto, perspiciatis fuga vero rerum dolor
                        </p>
                    </div>
                    <div className="comment">
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere temporibus consequuntur 
                            praesentium nostrum nihil quaerat reprehenderit, iusto, perspiciatis fuga vero rerum dolor
                        </p>
                    </div>
                </div>
                
            </main>
            }
        </div>
    )
}

export default MoviePage
