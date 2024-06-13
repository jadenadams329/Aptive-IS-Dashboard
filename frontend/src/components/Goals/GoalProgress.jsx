import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserSales } from "../../store/userSales";

function GoalProgress({goal}) {
    const dispatch = useDispatch()
    const userSales = Object.values(useSelector((state) => state.userSales.data))
    console.log(goal, "here is the goal")

    console.log(userSales)

    useEffect(() => {
		dispatch(getUserSales());
	}, [dispatch]);

  return (
    <div>GoalProgress</div>
  )
}

export default GoalProgress
