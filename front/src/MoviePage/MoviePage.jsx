import React, {useState, useEffect} from 'react'
import './moviepage.css'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
import notfound from "../Placeholder-photos/nf.png"
import noavatar from "../Placeholder-photos/no_avatar.jpg"




const MoviePage = () => {  
    
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
                <div className="movie-container" style={{backgroundImage: "url(" + background + movie.backdrop_path + ")"}}>
                    <div className="movie-info">
                    <div className="movie-poster">
                    <img src={ movie.poster_path === null ? notfound : posterPath+movie.poster_path} alt="Poster de la película"/>
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
                            <p>{movie.overview === '' ? "No hay información de esta película." : movie.overview }</p>
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
                    <h2>Comentarios (X)</h2>
                    
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
