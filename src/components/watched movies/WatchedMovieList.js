import React from "react";
import { WatchedMovie } from "./WatchedMovie";

export function WatchedMovieList({ watched, onDeleteWatchedMovie, setQuery }) {
	return (
		<>
			<ul className="list list-movies">
				{watched.map((movie) => {
					return <WatchedMovie key={movie.imdbId} setQuery={setQuery} onDeleteWatchedMovie={onDeleteWatchedMovie} movie={movie} />;
				})}
			</ul>
		</>
	);
}
