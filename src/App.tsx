import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import Root from "./routes/Root";
import LeftNavbar from "./components/LeftNavbar/LeftNavbar";

function App() {
	const isAuthenticated = true; // Replace with your authentication logic

	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	}, []);

	return (
		<div
			style={{
				display: "flex",
				height: "100vh",
				width: "100vw",
			}}
		>
			{isAuthenticated && <LeftNavbar />}

			<Routes>
				<Route path="/" element={<Root />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
