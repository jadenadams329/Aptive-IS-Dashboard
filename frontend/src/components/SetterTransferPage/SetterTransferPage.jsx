import SetterTransferTable from "./SetterTransferTable";
import "./SetterTransferPage.css";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import NewLeadForm from "../NewLeadForm/NewLeadForm";

function SetterTransferPage() {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<>
			<div className='stp'>
				<div className='stpContainer'>
					<div className="topStp">
						<OpenModalButton buttonText='Create Lead' modalComponent={<NewLeadForm />} />
						<input
						className="stpSearch"
						type='text'
						placeholder='Search...'
					/>
					</div>
					<SetterTransferTable user={sessionUser} />
				</div>
			</div>
		</>
	);
}

export default SetterTransferPage;
