import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { createGoal } from "../../store/goals";
import './NewGoalModal.css'

function NewGoalModal() {
    const [goalName, setGoalName] = useState("")
    const [goalValue, setGoalValue] = useState("")
    const [goalType, setGoalType] = useState("ACV")
    const [targetDate, setTargetDate] = useState("")
    const { closeModal } = useModal();
	const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            name: goalName,
            value: goalValue,
            type: goalType,
            targetDate,
            status: "In Progress"
        }
        if (formData) {
            try {
                await dispatch(createGoal(formData))
                closeModal();
            } catch (err) {
                console.error(err);
            }
        }
    }
	return (
		<>
			<h2 className='nlHeader'>Create a new goal</h2>
			<div className='formContainer'>
				<form onSubmit={handleSubmit}>
					<div className='nmFormContainer'>
						<div className='nlSection'>
							<label>Goal Name</label>
							<input type='text' value={goalName} onChange={(e) => setGoalName(e.target.value)} required/>
						</div>
                        <div className="ngmSectionTwo">
                            <div className='nlSection'>
                                <label>Goal Value</label>
                                <input type='number' value={goalValue} onChange={(e) => setGoalValue(e.target.value) } required/>
                            </div>
                            <div className='nlSection'>
                                <label>Goal Type</label>
                                <select onChange={(e) => setGoalType(e.target.value)} value={goalType} required>
                                    <option value={"ACV"}>ACV</option>
                                    <option value={"Autopay"}>Autopay</option>
                                    <option value={"ACH"}>ACH</option>
                                    <option value={"Multi-Year"}>Multi-Year</option>
                                </select>
                            </div>

                        </div>
                        <div className='nlSection'>
							<label>Target Date</label>
							<input id="targetDate" type='date' value={targetDate} onChange={(e) => setTargetDate(e.target.value)} required/>
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

export default NewGoalModal;
