import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./MoviePage.css";
import Missing from "../../pages/missing/Missing";

const MoviePage = () => {
    const [movieDetail, setMovieDetail] = useState('');
    const [fetchError, setFetchError] = useState(null);

    const {id} = useParams();

    useEffect(() => {
        const getData = async () => {
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
                setMovieDetail(response.data);

            }
            catch(err){
                console.log(err.message);
                setFetchError(err.message);
            }
        }
        getData();
    }, [id])

  return (
    <>
    {!fetchError && 
            <div className="movie">
            <div className="movie_intro">
                <img className="movie_backdrop" src={`https://image.tmdb.org/t/p/original${movieDetail ? movieDetail.backdrop_path : ""}`}  />
            </div>
            <div className="movie_detail">
                <div className="movie_detailLeft">
                    <div className="movie_posterBox">
                        <img className="movie_poster" src={`https://image.tmdb.org/t/p/original${movieDetail ? movieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="maovie_detailRight">
                    <div className="movie_detailRightTop">
                        <div className="movie_name">{movieDetail? movieDetail.original_title: ""}</div>
                        <div className="movie_tagline">{movieDetail? movieDetail.tagline: ""}</div>
                        <div className="movie_rating">{movieDetail? movieDetail.rating: ""}</div>
                        <div className="movie_rating">{movieDetail? movieDetail.vote_average: ""}
                            <i className="fas fa-star" />
                            <span className="movie_voteCount">{movieDetail ? movieDetail.vote_count: ""}</span>
                        </div>
                        <div className="movie_runtime">{movieDetail? movieDetail.runtime: ""}</div>
                        <div className="movie_releaseDate">{movieDetail ? movieDetail.release_data: ""}</div>
                        <div className="movie_genres">
                            { 
                              movieDetail && movieDetail.genres ? movieDetail.genres.map(genre =>(
                                <> <span className="movie_genre" id={genre.id}>{genre.name}</span> </> 
                              ))
                              : ""
                            }   
                        </div>
                    </div>
                    <div className="movie_detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{movieDetail ? movieDetail.overview : ""}</div>
                    </div>
                </div>
            </div>
        </div>
    }
    {fetchError && 
    
        <Missing fetchError={fetchError}/>
    }
    </>
  );
};

export default MoviePage;
