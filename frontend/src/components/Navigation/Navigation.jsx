import "./Navigation.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";


function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		navigate("/")
	};

	const sessionLinks = sessionUser ? (
		<button className='logout' onClick={logout}>
			Log Out<i className='fa-solid fa-arrow-right' style={{ marginLeft: "5px" }}></i>
		</button>
	) : (
		<>
			<NavLink className='session-link' to='/login'>
				Log In<i className='fa-solid fa-arrow-right' style={{ marginLeft: "5px" }}></i>
			</NavLink>
			<NavLink className='session-link' to='/signup'>
				Sign Up<i className='fa-solid fa-arrow-right' style={{ marginLeft: "5px" }}></i>
			</NavLink>
		</>
	);

	return (
		<div className='sidebar'>
			<div className='logo-container'>
				<img src='https://brand.goaptive.com/wp-content/uploads/2023/10/white_logo.svg' alt='Logo' className='logo' />

				{sessionUser && <p style={{ color: "white", fontWeight: "100" }}>Welcome, {sessionUser.firstName}</p>}

				<nav className='nav-menu'>
					{sessionUser && <NavLink to='/setter-transfers'>Setter Transfers</NavLink>}
					{sessionUser && (sessionUser.role === "closer" || sessionUser.role === "manager") && (
						<NavLink to='/sales-tracker'>My Sales Tracker</NavLink>
					)}
					{sessionUser && (sessionUser.role === "closer") && <NavLink to='/goals'>My Goals</NavLink>}
				</nav>
			</div>
			{isLoaded && <div className='session-links'>{sessionLinks}</div>}
		</div>
	);
}

export default Navigation;
