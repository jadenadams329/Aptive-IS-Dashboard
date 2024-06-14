import GoalCard from "./GoalCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllGoals } from "../../store/goals";
import './GoalsPage.css'

function GoalsPage() {
	const dispatch = useDispatch();
	const userGoals = Object.values(useSelector((state) => state.goals.data))

	console.log(userGoals);
	useEffect(() => {
		dispatch(getAllGoals());
	}, [dispatch]);
	return (
		<>
		<div className="gpPage">
			<div className="gpContainer">
				<div className="gpSection">
					<h1 className="title">My Goals</h1>
					<button>
						<i className='fa-solid fa-plus'></i>Add Goal
					</button>
				</div>
				<div className="gcSection">
					{userGoals &&
                        userGoals.map(goal => {
                          return <GoalCard key={goal.id} goal={goal}/>
                        })
                    }
				</div>
			</div>
		</div>
		</>
	);
}

export default GoalsPage;
