import "./Home.css"
import { useState, useEffect } from 'react';
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MoviesList from "../../components/moviesList/MoviesList";
import Missing from "../missing/Missing";


const Home = () => {

    const [popularMovies, setPopularMovies] = useState([]);
    const [fetchError, setFetchError] = useState(null);

  const popular_api = 'https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US';

  useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await axios.get(popular_api);
            setPopularMovies(response.data.results);
          }
          catch(err){
            console.log('Error fetching data:', err);
            setFetchError(err.message);
            console.log(err.message);
          }
      }

      fetchData();
  }, [])


  return (
    <>
        {!fetchError && 
                    <div className="poster">
                    <Carousel 
                        showThumbs={false} 
                        infiniteLoop={true} 
                        autoPlay={true} 
                        transitionTime={3} 
                        showStatus={false}
                    >
                        {
                        popularMovies.map(movie => (
                        
                            <>
                            <Link style = {{textDecoration: "none", color:"white"}} to={`/movie/${movie.id}`}>
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className="posterImage_overlay">
                                        <div className="posterImage__title" >
                                            {movie ? movie.original_title : ""}
                                        </div>
                                        <div className="posterImage_runtime">
                                            {movie ? movie.release_date: ""}
                                            <span className="posterImage_rating">
                                            {movie? movie.vote_average : ""}
                                            <i className="fas fa-star" />{" "}
                                            </span>
                                        </div>
                                        <div className="posterImage_description">
                                            {movie? movie.overview : ""}
                                        </div>
                                </div>
                            </Link>
                            
                            </>
                            
                         ) )
                        }
        
                    </Carousel>
                    <MoviesList />
                </div>
        }
        {fetchError && 
        
            <Missing fetchError={fetchError}/>
        }
    </>
  );
};

export default Home;


