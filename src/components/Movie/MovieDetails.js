import React, { useEffect, useState } from "react";
import { Loader } from "../Loader";
import StarRating from "../StarRating";

export function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState(0);
	// derived states
	const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);
	const watchedUserRating = watched.find((movie) => movie.imdbId === selectedId)?.userRating;
	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;
	function handleAdd() {
		const newWatchedMovie = {
			imdbId: selectedId,
			title,
			year,
			poster,
			userRating,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(" ").at(0)),
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie(null);
	}
	useEffect(() => {
		async function getMovieDetails() {
			setIsLoading(true);
			const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${selectedId}`);
			const data = await res.json();
			setMovie(data);
			setIsLoading(false);
		}
		getMovieDetails();
	}, [selectedId]);
	useEffect(() => {
		if (!title) return;
		document.title = `Movie | ${title}`;
		return function () {
			document.title = "usePopcorn";
		};
	}, [title]);
	useEffect(() => {
		function callback(e) {
			if (e.code === "Escape") onCloseMovie();
		}
		document.addEventListener("keydown", callback);
		return () => {
			document.removeEventListener("keydown", callback);
		};
	}, [onCloseMovie]);
	return (
		<>
			<div className="details">
				{isLoading ? (
					<Loader />
				) : (
					<>
						<header>
							<button className="btn-back" onClick={onCloseMovie}>
								&larr;
							</button>
							<img src={poster} alt={`Poster of ${title} movie`} />
							<div className="details-overview">
								<h2>{title}</h2>
								<p>
									{released} &bull; {runtime}
								</p>
								<p>{genre}</p>
								<p>
									<span>⭐</span>
									{imdbRating} IMDB rating
								</p>
							</div>
						</header>
						<section>
							<div className="rating">
								{!isWatched ? (
									<>
										<StarRating maxRating={10} size={24} onSetRating={setUserRating} />
										<button className="btn-add" onClick={handleAdd}>
											+ Add to List
										</button>
									</>
								) : (
									<>
										<p>
											you have already rated this movie <span>{watchedUserRating}🌟</span>
										</p>
										<StarRating maxRating={10} size={24} defaultRating={watchedUserRating} isEditable={false} />
									</>
								)}
							</div>
							<p>
								<em>{plot}</em>
							</p>
							<p>Starring {actors}</p>
							<p>Directed by {director}</p>
						</section>
					</>
				)}
			</div>
		</>
	);
}
