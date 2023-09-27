import Skeleton from "react-loading-skeleton";
import { useState, useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({movie, key}) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(()=>{
            setIsLoading(false);
        }, 1500)
    }, [])

  return (
   <>
    {isLoading ?
        <div className="cards">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
        <Link to={`/movie/${movie.id}`} style={{textDecoration: 'none', color:"white"}} >
            <div className="cards">

                <img className="cards_img" src = {`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`} />
                <div className="cards_overlay">
                    <div className="card__title" >
                        {movie ? movie.original_title : ""}
                    </div>
                    <div className="card_runtime">
                        {movie ? movie.release_date: ""}
                        <span className="card_rating">
                        {movie? movie.vote_average : ""}
                        <i className="fas fa-star" />{" "}
                        </span>
                    </div>
                    <div className="card_description">
                        {movie? movie.overview : ""}
                    </div>

            </div>


                </div>
        </Link>
    }
   </>
  );
};

export default Card;