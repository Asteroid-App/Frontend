import "./LeftNavbar.css";
import { FaRocket } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import { RiTodoFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const LeftNavbar = () => {
	const [activeNav, setActiveNav] = useState(0);

	useEffect(() => {
		//get the endpoit like /app
		const path = window.location.pathname.split("/")[1];
		//set the active nav
		switch (path) {
			case "call":
				setActiveNav(1);
				break;
			case "private-chat":
				setActiveNav(2);
				break;
			case "public-chat":
				setActiveNav(3);
				break;
			case "tasks":
				setActiveNav(4);
				break;
			default:
				setActiveNav(0);
		}

		document.getElementById(activeNav.toString())?.classList.add("active");
	}, []);
	return (
		<nav className="navbar">
			<NavLink id="0" to="/" onClick={() => setActiveNav(0)}>
				<FaRocket />
			</NavLink>
			<hr />
			<NavLink id="1" to="/call" onClick={() => setActiveNav(1)}>
				<BiPhoneCall />
			</NavLink>
			<NavLink id="2" to="/private-chat" onClick={() => setActiveNav(2)}>
				<BsFillChatDotsFill />
			</NavLink>
			<NavLink id="3" to="/public-chat" onClick={() => setActiveNav(3)}>
				<IoPeople />
			</NavLink>
			<NavLink id="4" to="/tasks" onClick={() => setActiveNav(4)}>
				<RiTodoFill />
			</NavLink>
		</nav>
	);
};

export default LeftNavbar;
