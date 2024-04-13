import SetterTransferTable from "./SetterTransferTable";
import "./SetterTransferPage.css";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function SetterTransferPage() {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<>
			<div className='stpContainer'>
        <OpenModalButton buttonText="Create Lead" modalComponent={<p>Create Lead</p>} />
				<SetterTransferTable user={sessionUser} />
			</div>
		</>
	);
}

export default SetterTransferPage;
