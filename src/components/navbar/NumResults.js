import React from "react";

export function NumResults({ movies }) {
	return (
		<>
			<p className="num-results">
				Found <strong>{movies.length}</strong> Results
			</p>
		</>
	);
}
