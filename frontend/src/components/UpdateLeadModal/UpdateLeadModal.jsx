import { useState } from "react";
import { useDispatch } from "react-redux";
import { editLead } from "../../store/leads";
import { useModal } from "../../context/Modal";

function UpdateLeadModal({ lead, user }) {
	// console.log(lead);
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const [name, setName] = useState(lead?.name);
	const [address, setAddress] = useState(lead?.address);
	const [zipCode, setZipCode] = useState(lead?.zipCode);
	const [phoneNumber, setPhoneNumber] = useState(lead?.phoneNumber);
	const [notes, setNotes] = useState(lead?.notes);
	const [disposition, setDisposition] = useState(lead?.disposition);
	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = { setterId: lead?.setterId, closerId: lead?.closerId, name, address, zipCode, phoneNumber, notes, disposition };

		try {
			await dispatch(editLead(formData, lead?.id));
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
			<div>
				<h2>Edit Lead</h2>
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
					{user && user.role === "manager" && (
						<div>
							<label>Disposition</label>
							<select defaultValue={disposition} onChange={(e) => setDisposition(e.target.value)}>
								<option value='Transferred - Closer'>Transferred - Closer</option>
								<option value='Sold'>Sold</option>
								<option value='Not Interested'>Not Interested</option>
								<option value='One Time Wasp'>One Time Wasp</option>
								<option value='Scheduled Callback'>Scheduled Callback</option>
								<option value='Unqualified'>Unqualified</option>
							</select>
						</div>
					)}
					<button type='submit'>Submit</button>
				</form>
			</div>
		</>
	);
}

export default UpdateLeadModal;
