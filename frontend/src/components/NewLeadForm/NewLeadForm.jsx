import { useState } from "react";
import { useDispatch } from "react-redux";
import { createLead } from "../../store/leads";
import { useModal } from "../../context/Modal";
import "./NewLeadForm.css";

function NewLeadForm() {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [notes, setNotes] = useState("");
	const [errors, setErrors] = useState({});
	const disposition = "Transferred - Closer";

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = { name, address, zipCode, phoneNumber, notes, disposition };

		// Reset errors at the start of a new submission attempt
		setErrors({});

		try {
			await dispatch(createLead(formData));
			closeModal();
		} catch (res) {
			const data = await res.json();
			if (data) {
				setErrors(data.errors);
				return errors;
			}
		}
	};

	return (
		<>
			<h2 className='nlHeader'>Create a new lead</h2>
			<div className='formContainer'>
				<form onSubmit={handleSubmit}>
					<div className='nlFormContainer'>
						<div className='nlSection'>
							<label>Name</label>
							<input type='text' value={name} onChange={(e) => setName(e.target.value)} required></input>
						</div>
						<div className='nlSection'>
							<label>Phone Number</label>
							<input
								id='phone'
								type='number'
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								required
							></input>
							{errors.phoneNumber && <p className='error'>{errors.phoneNumber}</p>}
						</div>
						<div className='addZip'>
							<div className='nlSection' id='address'>
								<label>Address</label>
								<input type='text' value={address} onChange={(e) => setAddress(e.target.value)}></input>
							</div>
							<div className='nlSection' id='zip'>
								<label>Zip Code</label>
								<input type='number' value={zipCode} onChange={(e) => setZipCode(e.target.value)} required></input>
								{errors.zipCode && <p className='error'>{errors.zipCode}</p>}
							</div>
						</div>

						<div className='nlSection'>
							<label>Notes</label>
							<textarea
								type='text'
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
								required
								rows='4'
								cols='50'
								style={{ backgroundColor: "rgb(232, 232, 232)", border: "none", padding: "3px 10px", resize: "none" }}
							></textarea>
						</div>
						<button className='formSubmit' type='submit'>
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default NewLeadForm;
