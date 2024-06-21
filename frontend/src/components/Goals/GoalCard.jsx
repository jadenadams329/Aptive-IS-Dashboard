import GoalProgress from "./GoalProgress";
import "./GoalCard.css";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteGoalModal from "./DeleteGoalModal";
import EditGoalModal from "./EditGoalModal";

function GoalCard({ goal }) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const closeDropdown = () => {
		setDropdownOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className='gcContainer'>
			<div className='gcTopSection'>
				<h3>{goal && goal.name}</h3>
				<div className='dropdown' ref={dropdownRef}>
					<button onClick={toggleDropdown}>
						<i id='dotIcon' className='fa-solid fa-ellipsis-vertical'></i>
					</button>
					{dropdownOpen && (
						<div className='dropdown-content'>
							<div className="dropDown">
								<OpenModalButton
									dropDownCss={true}
									buttonText={"Edit Goal"}
									modalComponent={<EditGoalModal goal={goal} />}
									onButtonClick={closeDropdown}
								/>
							</div>
							<div className="dropDown">
								<OpenModalButton
									dropDownCss={true}
									buttonText={"Delete Goal"}
									modalComponent={<DeleteGoalModal goal={goal} />}
									onButtonClick={closeDropdown}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className='gcMiddleSection'>
				<GoalProgress goal={goal} />
			</div>
			<div className='gcBottomSection'>
				<p className='goalType'>{goal && `${goal.type} Goal`}</p>
				<p className='goalValue'>{goal && (goal.type === "ACV" ? `$${goal.value}` : `${goal.value}%`)}</p>
			</div>
		</div>
	);
}

export default GoalCard;
