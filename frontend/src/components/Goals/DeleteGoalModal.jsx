import { useDispatch } from "react-redux";
import { deleteGoal } from "../../store/goals";
import { useModal } from "../../context/Modal";

function DeleteGoalModal({ goal }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const handleDeleteGoal = async (goalId) => {
		await dispatch(deleteGoal(goalId))
        closeModal()
	};


	return (
		<>
			<div className="dgContainer">
				<div className="dgSection">
					<h2>Delete Goal</h2>
					<p>Are you sure you want to permanently delete this goal?</p>
				</div>
				<div className="dgbSection">
					<button onClick={() => handleDeleteGoal(goal.id)}>Yes</button>
					<button onClick={closeModal}>No</button>
				</div>
			</div>
		</>
	);
}

export default DeleteGoalModal;
