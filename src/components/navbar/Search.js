import React, { useEffect, useRef, useState } from "react";

export function Search({ setFirst, first, query, setQuery }) {
	const inputEl = useRef(null);
	function handleSearch(e) {
		setQuery(e.target.value);
		setFirst(false);
	}
	useEffect(function () {
		function callback(e) {
			if (first) {
				inputEl.current.focus();
			}
			if (e.code === "Enter") {
				setFirst(true);
			}
		}
		document.addEventListener("keydown", callback);
		return () => document.removeEventListener("keydown", callback);
	}, []);
	return (
		<>
			<input
				ref={inputEl}
				type="text"
				className="search"
				placeholder="search movies..."
				value={first ? "" : query}
				onChange={(e) => handleSearch(e)}
			/>
		</>
	);
}
