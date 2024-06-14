import GoalProgress from "./GoalProgress"

function GoalCard({goal}) {

  return (
    <div>
        <div>
            <h3>{goal && goal.name}</h3>
            <p>{goal && `${goal.type}: ${goal.value}`}</p>
        </div>
        <div>
            <GoalProgress goal={goal}/>
        </div>
    </div>
  )
}

export default GoalCard
