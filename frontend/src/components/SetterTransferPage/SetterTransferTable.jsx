import "./SetterTransferTable.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteLead } from "../../store/leads";
import { getAllLeads, editLead } from "../../store/leads";
import Spinner from "../Spinner/Spinner";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateLeadModal from "../UpdateLeadModal/UpdateLeadModal";
import NewSaleForm from "../NewSaleForm/NewSaleForm";
import { useModal } from '../../context/Modal';

function SetterTransferTable({ user }) {
	const dispatch = useDispatch();
	const leadState = useSelector((state) => state.leads.data);
	const isLoading = useSelector((state) => state.leads.isLoading);
	const leads = Object.values(leadState);
	const [deleted, setDeleted] = useState(false);
	const [claimed, setClaimed] = useState(false);
	const [editingLeadId, setEditingLeadId] = useState(null);
	const [selectedDisposition, setSelectedDisposition] = useState("Transferred - Closer");
	const { setModalContent } = useModal();

	useEffect(() => {
		dispatch(getAllLeads());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	const handleDelete = (leadId) => {
		dispatch(deleteLead(leadId)).then(() => {
			setDeleted(!deleted);
		});
	};

	const handleClaim = (lead, user) => {
		lead.closerId = user.id;
		dispatch(editLead(lead, lead.id)).then(() => {
			setClaimed(!claimed);
		});
	};

	const handleUnclaim = (lead) => {
		lead.closerId = null;
		dispatch(editLead(lead, lead.id)).then(() => {
			setClaimed(!claimed);
		});
	};

	const handleCloserDisposition = (lead) => {
		setEditingLeadId(null);

		lead.disposition = selectedDisposition;
		dispatch(editLead(lead, lead.id)).then(() => {
			if(selectedDisposition === 'Sold') {
				setModalContent(
					<NewSaleForm lead={lead}/>
				);
			}
		});
	};

	const renderButtons = (lead) => {
		let editButton;

		if (user) {
			if (user.role === "manager" || (user.role === "setter" && lead.setterId === user.id)) {
				editButton = (
					<OpenModalButton
						buttonText={<i className='fa-regular fa-pen-to-square'></i>}
						modalComponent={<UpdateLeadModal lead={lead} user={user} />}
					/>
				);
			}

			if (user.role === "manager") {
				return (
					<>
						{editButton && editButton}
						<button id='trash' onClick={() => handleDelete(lead.id)}>
							<i className='fa-solid fa-trash'></i>
						</button>
					</>
				);
			} else if (user.role === "closer" && !lead.closerId) {
				return (
					<button onClick={() => handleClaim(lead, user)}>
						<i className='fa-solid fa-user-plus'></i>
					</button>
				);
			} else if (user.role === "closer" && lead.closerId === user.id) {
				if (editingLeadId === lead.id) {
					return (
						<button onClick={() => handleCloserDisposition(lead)}>
							<i className='fa-regular fa-floppy-disk'></i>
						</button>
					);
				} else {
					return (
						<>
							<button onClick={() => setEditingLeadId(lead.id)}>
								<i className='fa-regular fa-pen-to-square'></i>
							</button>
							<button onClick={() => handleUnclaim(lead)} className='unclaim'>
								<i className='fa-solid fa-user-xmark'></i>
							</button>
						</>
					);
				}
			} else if (user.role === "setter" && lead.setterId === user.id) {
				return <>{editButton && editButton}</>;
			}
		}
	};

	return (
		<>
			<div className='tableFixHead'>
				<table>
					<thead>
						<tr>
							<th>Actions</th>
							<th id='setterColumn'>Setter</th>
							<th id='closerColumn'>Closer</th>
							<th id='dispColumn'>Disposition</th>
							<th id='nameColumn'>Name</th>
							<th id='phoneColumn'>Phone</th>
							<th>Notes</th>
						</tr>
					</thead>
					<tbody>
						{leads &&
							leads.map((lead, index) => (
								<tr key={lead.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
									<td id='action'>
										<div className='mButtonsContainer'>{renderButtons(lead)}</div>
									</td>
									<td>{lead.Setter && lead.Setter.firstName}</td>
									<td>{lead.Closer ? lead.Closer.firstName : "N/A"}</td>
									<td>
										{editingLeadId === lead.id ? (
											<select value={selectedDisposition} onChange={(e) => setSelectedDisposition(e.target.value)}>
												<option value='Transferred - Closer'>Transferred - Closer</option>
												<option value='Sold'>Sold</option>
												<option value='Not Interested'>Not Interested</option>
												<option value='One Time Wasp'>One Time Wasp</option>
												<option value='Scheduled Callback'>Scheduled Callback</option>
												<option value='Unqualified'>Unqualified</option>
											</select>
										) : (
											lead.disposition && lead.disposition
										)}
									</td>
									<td>{lead.name && lead.name}</td>
									<td>{lead.phoneNumber && lead.phoneNumber}</td>
									<td id='notes'>
										{lead.zipCode && lead.address + ", " + lead.zipCode + ", " + (lead.notes && lead.notes)}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default SetterTransferTable;
