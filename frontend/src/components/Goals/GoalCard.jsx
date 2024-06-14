import GoalProgress from "./GoalProgress";
import "./GoalCard.css";
import { useState, useEffect, useRef } from "react";

function GoalCard({ goal }) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
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
							<a href='#'>Edit Goal</a>
							<a href='#'>Delete Goal</a>
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
