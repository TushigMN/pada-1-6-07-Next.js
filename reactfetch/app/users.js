"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=8476a7ab80ad76f0936744df0430e67c&language=en-US&page=1")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, [reload]);

  return (
    <div>
      <button
        className="border-2 p-4"
        onClick={() => {
          setReload(!reload);
        }}
      >
        dar{" "}
      </button>
      {movies.map((movie, index) => (
        <div>
          {movie.title}

          <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
        </div>
      ))}
    </div>
  );
}

