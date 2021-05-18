import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import './list.css'
import axios from 'axios'

const List = () => {

    const apikey = 'api_key=7d3b7c40d4e3aa199e88e96633259b87' 
    var user_id = window.localStorage.getItem('user_id');
    var user_name = window.localStorage.getItem('user_name');
    const [lists, setLists] = useState([])
    const [externalMovies, setExternalMovies] = useState([])
    const [movies, setMovies] = useState([])
    const [listID, setListID] = useState([])
    let listLink = 'http://127.0.0.1:5000/lists/'+user_id
    var search = ''
    const [allLists, setAllLists] = useState([])
    
    // let search = "https://api.themoviedb.org/3/movie/"+id+"?"+apikey+"&language=es-ES"

    useEffect(() => {
        async function getLists() {
            const request = await axios.get(listLink)
            const data  = request.data
            setLists(request.data)
            data.forEach(element => {
                console.log(element.movie)
                // var search = "https://api.themoviedb.org/3/movie/"+element.movie.external_id+"?"+apikey+"&language=es-ES"
                // const request = axios.get(search)
                // const data = request.data
                // console.log(data)
            });
        }
        getLists()
    
    }, [])

    const getMovies = async() =>{
        console.log(lists)
    }

    const getLists = async() => {
        const res = await fetch(listLink)
        const data = await res.json()
        setLists(data)
        for (let i = 0; i < data.length; i++) {
            const movies = data[i].movie;
            setExternalMovies(movies)
            // for (let j = 0; j < movies.length; j++) {
            //     const external_id = movies[j].external_id;
            //     search = "https://api.themoviedb.org/3/movie/"+external_id+"?"+apikey+"&language=es-ES"
            //     const res = await fetch(search)
            //     const data = await res.json()
            //     setMovies(data)
                
            // }
        }
    }


    return (
        <div className="list-container">
            <NavBar/>    
            <main>
                <div className="mylists">
                    <ul>
                        <li>Crear lista</li>
                        {
                            lists.map((list) =>
                                <li key={list.id}> {list.name} </li>
                            )
                        }
                        
                    </ul>
                </div>
     
                {
                    lists.map((list) =>
                        <div key={list.id} className="list-content">
                            <span className="list-title"> {list.name} </span>
                            <div className="option">
                                <span>Editar - icono</span>
                            </div>
                        
                        </div>
                    )
                }
                
                
                {/* <div className="movie-cast-container">
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
                </div> */}
            </main>
        </div>
    )
}

export default List
