import "./SetterTransferTable.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteLead } from "../../store/leads";
import { getAllLeads } from "../../store/leads";
import Spinner from "../Spinner/Spinner"

function SetterTransferTable({ user }) {
    const dispatch = useDispatch();
    const leadState = useSelector(state => state.leads.data)
    const isLoading = useSelector(state => state.leads.isLoading)
    const leads = Object.values(leadState)
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        dispatch(getAllLeads());
    }, [dispatch, deleted]);

    if(isLoading){
        return <Spinner />
    }

    const handleDelete = (leadId) => {
        dispatch(deleteLead(leadId)).then(() => {
            setDeleted(!deleted);
        });
    };

	const renderButtons = (lead) => {
		if (!user) return <i className="fa-solid fa-ban"></i>;

		if (user.role === "manager") {
			return (
				<>
					<button>Claim</button>
					<button><i className="fa-regular fa-pen-to-square"></i></button>
					<button onClick={() => handleDelete(lead.id)}><i className="fa-solid fa-trash"></i></button>
				</>
			);
		} else if (user.role === "closer" && !lead.closerId) {
			return <button>Claim</button>;
		} else if (user.role === "setter" && lead.setterId === user.id) {
			return <button><i className="fa-regular fa-pen-to-square"></i></button>;
		} else {
            return <i className="fa-solid fa-ban"></i>;
        }
	};

	return (
		<>
			<div className='tableFixHead'>
				<table>
					<thead>
						<tr>
							<th>Action</th>
							<th>Setter</th>
							<th>Sales Rep</th>
							<th>Disposition</th>
							<th>Lead Name</th>
							<th>Phone</th>
							<th>Address</th>
							<th>Notes</th>
						</tr>
					</thead>
					<tbody>
						{leads &&
							leads.map((lead) => (
								<tr key={lead.id}>
									<td>{renderButtons(lead)}</td>
									<td>{lead.Setter ? lead.Setter.firstName : "N/A"}</td>
									<td>{lead.Closer ? lead.Closer.firstName : "N/A"}</td>
									<td>{lead.disposition && lead.disposition}</td>
									<td>{lead.name && lead.name}</td>
									<td>{lead.phoneNumber && lead.phoneNumber}</td>
									<td>{lead.address && lead.zipCode && lead.address + ", " + lead.zipCode}</td>
									<td>{lead.notes && lead.notes}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default SetterTransferTable;
