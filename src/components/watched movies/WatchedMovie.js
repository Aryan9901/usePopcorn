import React from "react";

export function WatchedMovie({ movie, onDeleteWatchedMovie, setQuery }) {
	return (
		<li>
			<img onClick={() => setQuery(movie.title)} src={movie.poster} alt={`${movie.title} Poster`} />
			<h3 onClick={() => setQuery(movie.title)}>{movie.title}</h3>
			<div>
				<p onClick={() => setQuery(movie.title)}>
					<span>⭐️</span>
					<span>{movie.imdbRating.toFixed(2)}</span>
				</p>
				<p onClick={() => setQuery(movie.title)}>
					<span>🌟</span>
					<span>{movie.userRating.toFixed(2)}</span>
				</p>
				<p onClick={() => setQuery(movie.title)}>
					<span>⏳</span>
					<span>{`${movie.runtime} min`}</span>
				</p>
				<button className="btn-delete" onClick={() => onDeleteWatchedMovie(movie.imdbId)}>
					X
				</button>
			</div>
		</li>
	);
}
