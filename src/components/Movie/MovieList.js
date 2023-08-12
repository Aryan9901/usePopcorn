import React from "react";
import { Movie } from "./Movie";

export function MovieList({ movies, onSelectMovie }) {
	return (
		<ul className="list list-movies">
			{movies.map((movie) => {
				return <Movie key={movie.imdbID} onSelectMovie={onSelectMovie} movie={movie} />;
			})}
		</ul>
	);
}
