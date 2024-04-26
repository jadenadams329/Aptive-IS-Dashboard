import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("")
	const [errors, setErrors] = useState({});

	if (sessionUser) return <Navigate to='/' replace={true} />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors({});
			return dispatch(
				sessionActions.signup({
					email,
					firstName,
					lastName,
					password,
          role
				})
			).catch(async (res) => {
				const data = await res.json();
				if (data?.errors) {
					setErrors(data.errors);
				}
			});
		}
		return setErrors({
			confirmPassword: "Confirm Password field must be the same as the Password field",
		});
	};

  console.log(role)

	return (
		<>
			<div className='formWrapper'>
				<div className='liFormContainer'>
					<h1>Sign Up</h1>
					<form onSubmit={handleSubmit}>
						<div className='liStuff'>
							<div className='nlSection'>
								<label>Email</label>
								<input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required />
								{errors.email && <p className="error">{errors.email}</p>}
							</div>
							<div className='nlSection'>
								<label>First Name</label>
								<input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
								{errors.firstName && <p>{errors.firstName}</p>}
							</div>
							<div className='nlSection'>
								<label>Last Name</label>
								<input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
								{errors.lastName && <p>{errors.lastName}</p>}
							</div>
							<div className="nlSection">
								<label>Role</label>
                <select className="dispositionForm" onChange={(e) => setRole(e.target.value)}>
                  <option value="setter">Setter</option>
                  <option value="closer">Closer</option>
                  <option value="manager">Manager</option>
                </select>
							</div>
							<div className='nlSection'>
								<label>Password</label>
								<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
								{errors.password && <p className="error">{errors.password}</p>}
							</div>
							<div className='nlSection'>
								<label>Confirm Password</label>
								<input
									type='password'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
								{errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
							</div>
							<button className='formSubmit' type='submit'>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default SignupFormPage;
