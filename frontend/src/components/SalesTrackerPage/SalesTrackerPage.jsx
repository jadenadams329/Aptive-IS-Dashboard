import SalesTrackerTable from "./SalesTrackerTable";
import { useSelector } from "react-redux";

function SalesTrackerPage() {
	const sessionUser = useSelector((state) => state.session.user);
	return (
		<>
			<div className='stp'>
				<div className='stpContainer'>
					<SalesTrackerTable user={sessionUser} />
				</div>
			</div>
		</>
	);
}

export default SalesTrackerPage;
