import { useState } from "react";
import { useDispatch } from "react-redux";
import { createLead } from "../../store/leads";
import { useModal } from "../../context/Modal";

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
                return errors
			}
		}
	};

	return (
		<>
			<div>
				<h2>Create a new lead</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Name</label>
						<input type='text' value={name} onChange={(e) => setName(e.target.value)} required></input>
					</div>
					<div>
						<label>Address</label>
						<input type='text' value={address} onChange={(e) => setAddress(e.target.value)}></input>
					</div>
					<div>
						<label>Zip Code</label>
						<input type='number' value={zipCode} onChange={(e) => setZipCode(e.target.value)} required></input>
                        {errors.zipCode && <p>{errors.zipCode}</p>}
					</div>
					<div>
						<label>Phone Number</label>
						<input type='number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required></input>
                        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
					</div>
					<div>
						<label>Notes</label>
						<textarea
							type='text'
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							required
							rows='4'
							cols='50'
						></textarea>
					</div>
					<button type='submit'>Submit</button>
				</form>
			</div>
		</>
	);
}

export default NewLeadForm;
