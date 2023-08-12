import React, { useState } from "react";

export function Box({ children, element }) {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<div className="box">
			<button onClick={() => setIsOpen((curr) => !curr)} className="btn-toggle">
				{isOpen ? "-" : "+"}
			</button>
			{element}
			{isOpen && children}
		</div>
	);
}
