import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserSales } from "../../store/userSales";
import { Gauge, gaugeClasses } from "@mui/x-charts";

function GoalProgress({ goal }) {
	const dispatch = useDispatch();
	const userSales = Object.values(useSelector((state) => state.userSales.data));
	const [goalValue, setGoalValue] = useState(null);
	const [statValue, setStatValue] = useState(null);
	const [color, setColor] = useState("red");
	const [gaugeText, setGaugeText] = useState("%");

	useEffect(() => {
		dispatch(getUserSales());
	}, [dispatch]);

	useEffect(() => {
		if (goal && userSales.length > 0) {
			setGoalValue(handleGoalValue(goal));
			setStatValue(handleStatValue(goal, userSales));
		}
	}, [goal, userSales]);

	const handleGoalValue = (goal) => {
		if (goal) {
			return goal.value;
		}
	};

	const handleStatValue = (goal, sales) => {
		if (goal.type === "ACV") {
			let total = calcAcv(sales);
			setGaugeText("$");
			if (total >= goal.value) {
				setColor("green");
			} else if (total < goal.value && goal.value - total <= 25) {
				setColor("yellow");
			} else {
				setColor("red");
			}
			return total;
		}

		if (goal.type === "Multi-Year") {
			let totalMulti = sales.filter((sale) => sale.agreementLength === 24);
			let percent = totalMulti.length / sales.length;
			let total = Math.round(percent * 100);
			if (total >= goal.value) {
				setColor("green");
			} else if (total < goal.value && goal.value - total <= 5) {
				setColor("yellow");
			} else {
				setColor("red");
			}
			return total;
		}

		if (goal.type === "Autopay") {
			let totalAutoPay = sales.filter((sale) => sale.autopay === true);
			let percent = totalAutoPay.length / sales.length;
			let total = Math.round(percent * 100);
			if (total >= goal.value) {
				setColor("green");
			} else if (total < goal.value && goal.value - total <= 5) {
				setColor("yellow");
			} else {
				setColor("red");
			}
			return total;
		}

		if (goal.type === "ACH") {
			let totalACH = sales.filter((sale) => sale.ach === true);
			let percent = totalACH.length / sales.length;
			let total = Math.round(percent * 100);
			if (total >= goal.value) {
				setColor("green");
			} else if (total < goal.value && goal.value - total <= 5) {
				setColor("yellow");
			} else {
				setColor("red");
			}
			return total;
		}
	};

	const calcAcv = (salesArr) => {
		let totalContractValue = 0;
		let count = 0;

		salesArr.forEach((object) => {
			let contractValue = 0;

			if (object.planType === "Premium") {
				contractValue = object.recurringPrice * 8 + object.initialPrice;
			} else if (object.planType === "Pro") {
				contractValue = object.recurringPrice * 6 + object.initialPrice;
			} else if (object.planType === "Basic") {
				contractValue = object.recurringPrice * 4 + object.initialPrice;
			}

			totalContractValue += contractValue;
			count++;
		});

		return (totalContractValue / count).toFixed(2);

	};

	return (
		<>
			<div>
				<Gauge
					width={150}
					height={150}
					value={statValue}
					valueMin={0}
					valueMax={goalValue}
					startAngle={0}
					endAngle={360}
					sx={{
						[`& .${gaugeClasses.valueArc}`]: {
							fill: color,
						},
					}}
					text={({ value, valueMax }) =>
						gaugeText === "$"
							? `${gaugeText}${value} `
							: `${value}${gaugeText} `
					}
				/>
			</div>
		</>
	);
}

export default GoalProgress;
