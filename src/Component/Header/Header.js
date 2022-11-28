import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header className="header">
			<h3>LOGO</h3>
			<nav className="Nav" ref={navRef}>
				<a className="a" href="./Home">Home</a>
				<a className="a" href="/#">Contacto</a>
				<a className="a" href="/Login">Login</a>
				<a className="a" href="/Register">registro</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;