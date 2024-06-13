function GoalCard({goal}) {

  return (
    <div>
        <div>
            <h3>{goal && goal.name}</h3>
        </div>
        <div>
            {/* //progress goes here */}
        </div>
        <div>
            Days left
        </div>
    </div>
  )
}

export default GoalCard
