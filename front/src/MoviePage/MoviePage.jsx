import React from 'react'
import './moviepage.css'
import NavBar from '../NavBar/NavBar'

const MoviePage = () => {
    // Llamada api para sacar Actores / Crew / Todo el mundo
    // Wonder woman 1984 https://api.themoviedb.org/3/movie/464052?api_key=7d3b7c40d4e3aa199e88e96633259b87&append_to_response=credits
    // https://api.themoviedb.org/3/movie/150540?api_key=7d3b7c40d4e3aa199e88e96633259b87&append_to_response=credits
    return (
        <div className="moviePage-container">
            <NavBar/>
            <main>
                <div className="movie-container">
                    <div className="movie-info">
                    <div className="movie-poster">
                        <img src="nf.png" alt=""/>
                    </div>

                    <div className="movie-all">

                        <div className="movie-title">
                            <span>Título ( año ) </span>
                            <button>Añadir a mi lista</button>
                            <button>Comentarios / Valorar</button>
                        </div>

                        <div className="movie-genres">
                            <p>
                                Suspense, Acción, Ciencia ficción
                            </p>
                        </div>

                        <div className="movie-description">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                deleniti ad, fuga molestiae vel quis enim, nostrum ea? Nemo
                                Voluptate, voluptas quos.
                            </p>
                        </div>
  
                    </div>
                </div>
                </div>
                <div className="movie-cast-container">
                    <h2>Reparto principal</h2>
                    <div className="movie-cast">
                        <div className="movie-cast-card">
                            <img src="nf.png" alt=""/>
                            <span>Kristina Tonteri-Young</span>
                        </div>

                        <div className="movie-cast-card">
                            <img src="nf.png" alt=""/>
                            <span>Nombre</span>
                        </div>
                        <div className="movie-cast-card">
                            <img src="nf.png" alt=""/>
                            <span>Kristina Tonteri-Young</span>
                        </div>

                        <div className="movie-cast-card">
                            <img src="nf.png" alt=""/>
                            <span>Nombre</span>
                        </div>
                        <div className="movie-cast-card">
                            <img src="nf.png" alt=""/>
                            <span>Kristina Tonteri-Young</span>
                        </div>

                        <div className="movie-cast-card">
                            <img src="nf.png" alt=""/>
                            <span>Nombre</span>
                        </div>
                        <div className="movie-cast-card">
                            <img src="nf.png" alt=""/>
                            <span>Kristina Tonteri-Young</span>
                        </div>

                        <div className="movie-cast-card">
                            <img src="nf.png" alt=""/>
                            <span>Nombre</span>
                        </div>
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
        </div>
    )
}

export default MoviePage
