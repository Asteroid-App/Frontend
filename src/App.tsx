import { BrowserRouter, Route, Navigate, Routes, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import Root from "./routes/Root";
import Register from "./routes/Register";
import Forget from "./routes/Forget";
import Home from "./routes/Home";
import "./style.scss";
// @ts-ignore-next-line
import { AuthContext } from "./context/AuthContext";

function App() {
	const isAuthenticated = false; // Replace with your authentication logic
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/login");
		}
	}, []);

	return (
		<Routes>
			
			<Route path="/" element={<Root />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/forget" element={<Forget />} />
			<Route path="/home" element={<Home />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
