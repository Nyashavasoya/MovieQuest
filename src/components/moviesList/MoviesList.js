import { useEffect, useState } from "react";
import Card from "../card/Card";
import "./moviesList.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Missing from "../../pages/missing/Missing";

const MoviesList = () => {
    const [movieList, setMovieList] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const {type} = useParams();

    useEffect(()=>{
        const getData = async () => {
            try {
             const response = await axios.get(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
             setMovieList((response.data).results);
             console.log(response.data.results);
            }
            catch(err) {
             console.log(err.message);
             setFetchError(err.message);
            }
         }
        getData();
    }, [type])


  return (
    <>
    {!fetchError && 
        <div className="movie_list">
        <h2 className="list_title">{(type ? type : "POPULAR").toUpperCase()}</h2>
        <div className="list_cards">
            {
              movieList.map(movie => (
                  <Card movie={movie} key={movie.id}/>
              ))
            }
        </div>
    </div>
    }
    {fetchError && 
        <Missing fetchError={fetchError}/>
    }
      </>
  );
};

export default MoviesList;
