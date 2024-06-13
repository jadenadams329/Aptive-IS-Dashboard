import GoalProgress from "./GoalProgress"

function GoalCard({goal}) {

  return (
    <div>
        <div>
            <h3>{goal && goal.name}</h3>
        </div>
        <div>
            <GoalProgress goal={goal}/>
        </div>
        <div>
            Days left
        </div>
    </div>
  )
}

export default GoalCard
