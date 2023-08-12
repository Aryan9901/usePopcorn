import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./components/StarRating";
import "./index.css";
import App from "./App";
// import App2 from "./App2";
// function Test() {
// 	const [rate, setRate] = useState(0);
// 	return (
// 		<>
// 			<StarRating color="blue" size={24} onSetRating={setRate} />
// 			<p>{rate}</p>
// 		</>
// 	);
// }

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<>
		<App />
		{/* <App2 /> */}
	</>
);

{
	/* <StarRating maxRating={5} className="test" defaultRating={3} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
		<Test /> */
}
