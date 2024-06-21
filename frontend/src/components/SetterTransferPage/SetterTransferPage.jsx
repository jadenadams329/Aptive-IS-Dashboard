import SetterTransferTable from "./SetterTransferTable";
import "./SetterTransferPage.css";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllLeads } from "../../store/leads";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import NewLeadForm from "../NewLeadForm/NewLeadForm";

function SetterTransferPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const leadState = useSelector((state) => state.leads.data);
	const isLoading = useSelector((state) => state.leads.isLoading);
	const isButtonDisabled = sessionUser.role === 'closer';
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		dispatch(getAllLeads());
	}, [dispatch]);

	useEffect(() => {
		const leads = Object.values(leadState);
		const results = leads.filter(lead =>
			lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			lead.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
			lead.phoneNumber.includes(searchTerm) ||
			`${lead.Setter.firstName} ${lead.Setter.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
			`${lead.Closer.firstName} ${lead.Closer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
			lead.notes.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setSearchResults(results);
	}, [searchTerm, leadState]);

	return (
		<>
			<div className='stp'>
				<div className='stpContainer'>
					<div className="topStp">
						<OpenModalButton cssClass={true} buttonText='Create Lead' modalComponent={<NewLeadForm />} disabled={isButtonDisabled} />
						<input
							className="stpSearch"
							type='text'
							placeholder='Search...'
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</div>
					<SetterTransferTable user={sessionUser} leads={searchResults} isLoading={isLoading} />
				</div>
			</div>
		</>
	);
}

export default SetterTransferPage;
