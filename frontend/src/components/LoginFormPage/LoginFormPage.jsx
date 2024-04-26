import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "./LoginFormPage.css";
import { Link } from "react-router-dom";

function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});

	if (sessionUser) return <Navigate to='/setter-transfers' replace={true} />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(sessionActions.login({ credential, password })).catch(async (res) => {
			const data = await res.json();
			if (data?.errors) setErrors(data.errors);
		});
	};

	const managerLogin = (e) => {
		e.preventDefault();
		return dispatch(sessionActions.login({ credential: "manager@goaptive.com", password: "password"}))
	}

	const closerLogin = (e) => {
		e.preventDefault();
		return dispatch(sessionActions.login({ credential: "closer@goaptive.com", password: "password"}))
	}

	const setterLogin = (e) => {
		e.preventDefault();
		return dispatch(sessionActions.login({ credential: "setter@goaptive.com", password: "password"}))
	}

	return (
		<>
			<div className='formWrapper'>
				<div className='liFormContainer'>
					<h1>Sign in</h1>
					<form onSubmit={handleSubmit}>
						<div className='liStuff'>
							<div className='nlSection'>
								<input
									placeholder='Email'
									type='text'
									value={credential}
									onChange={(e) => setCredential(e.target.value)}
									required
								/>
							</div>
							<div className='nlSection'>
								<input
									placeholder='Password'
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>

							{errors.credential && <p className='error'>{errors.credential}</p>}
							<button className='formSubmit' type='submit'>
								Sign in
							</button>
							<p id="loginP"><span>or</span></p>
							<div className="buttonDiv">
								<button onClick={managerLogin} className="liButton">Sign in as a Manager</button>
								<button onClick={closerLogin} className="liButton">Sign in as a Closer</button>
								<button onClick={setterLogin} className="liButton">Sign in as a Setter</button>
							</div>
						</div>
					</form>
				</div>
				<Link to={"/signup"} className="link">Sign Up</Link>
			</div>
		</>
	);
}

export default LoginFormPage;
