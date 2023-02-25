import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import Root from "./routes/Root";

function App() {
	const isAuthenticated = false; // Replace with your authentication logic
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Root />} />
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
