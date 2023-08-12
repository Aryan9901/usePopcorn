import React, { useEffect, useState } from "react";
import { NavBar } from "./components/navbar/NavBar";
import { Search } from "./components/navbar/Search";
import { NumResults } from "./components/navbar/NumResults";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie/MovieList";
import { WatchedMovieList } from "./components/watched movies/WatchedMovieList";
import { WatchedSummary } from "./components/watched movies/WatchedSummary";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { MovieDetails } from "./components/Movie/MovieDetails";

export const average = (arr) => arr.reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
const App = () => {
	const [query, setQuery] = useState("Matrix");
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState(function () {
		const stored = localStorage.getItem("watched");
		return JSON.parse(stored);
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedId, setSelectedId] = useState(null);
	const [first, setFirst] = useState(true);

	function handleSelectMovie(id) {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}
	function handleCloseMovie() {
		setSelectedId(null);
	}
	function handleAddWatched(movie) {
		setWatched((watched) => [...watched, movie]);
	}
	function handleDeleteWatched(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
	}
	useEffect(
		function () {
			localStorage.setItem("watched", JSON.stringify(watched));
		},
		[watched]
	);
	useEffect(() => {
		const controller = new AbortController();
		async function fetchMovies() {
			try {
				setIsLoading(true);
				setError("");
				const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}`, {
					signal: controller.signal,
				});
				if (!res.ok) throw new Error("!some error occured");
				const data = await res.json();
				if (data.Response === "False") throw new Error("Movie not Found");
				setMovies(data.Search);
			} catch (err) {
				if (err.name !== "AbortError") setError(err.message);
			} finally {
				setIsLoading(false);
			}
		}
		if (query.length < 3) {
			setMovies([]);
			setError("");
			return;
		}
		handleCloseMovie();
		fetchMovies();
		return () => {
			controller.abort();
		};
	}, [query]);
	return (
		<>
			<NavBar>
				<Search setFirst={setFirst} first={first} query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>
			<main className="main">
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && <MovieList onSelectMovie={handleSelectMovie} movies={movies} />}
					{error && <ErrorMessage message={error} />}
				</Box>
				{selectedId ? (
					<Box>
						<MovieDetails watched={watched} onAddWatched={handleAddWatched} onCloseMovie={handleCloseMovie} selectedId={selectedId} />
					</Box>
				) : (
					<Box element={<WatchedSummary watched={watched} />}>
						<WatchedMovieList setQuery={setQuery} watched={watched} onDeleteWatchedMovie={handleDeleteWatched} />
					</Box>
				)}
			</main>
		</>
	);
};

export default App;
