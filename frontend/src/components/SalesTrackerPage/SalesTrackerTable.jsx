import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { deleteSale, getUserSales } from "../../store/userSales";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateSaleModal from "../UpdateSaleModal/UpdateSaleModal";

function SalesTrackerTable({ user }) {
	const dispatch = useDispatch();
	const userSales = useSelector((state) => state.userSales.data);
	const isLoading = useSelector((state) => state.userSales.isLoading);
	const sales = Object.values(userSales);

	useEffect(() => {
		dispatch(getUserSales());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

    const handleDelete = (saleId) => {
        dispatch(deleteSale(saleId))
    }

	return (
		<>
			<div className='tableFixHead'>
				<table>
					<thead>
						<tr>
							<th>Actions</th>
							<th>Account #</th>
							<th>Plan</th>
							<th>Initial</th>
							<th>Recurring</th>
							<th>CV</th>
							<th>Length</th>
							<th>EZ</th>
							<th>Pay</th>
							<th>Serviced</th>
							<th>Date Scheduled</th>
						</tr>
					</thead>
					<tbody>
						{sales &&
							sales.map((sale, index) => {
								let cv;
								let ez;
								switch (sale.planType) {
									case "Basic":
										cv = sale.initialPrice + sale.recurringPrice * 4;
										break;
									case "Pro":
										cv = sale.initialPrice + sale.recurringPrice * 6;
										break;
									case "Premium":
										cv = sale.initialPrice + sale.recurringPrice * 8;
										break;
									default:
										cv = "N/A";
								}
								if (sale.autopay && sale.ach) {
									ez = "ACH";
								} else if (sale.autopay && !sale.ach) {
									ez = "CC";
								} else {
									ez = "None";
								}
								return (
									<tr key={sale.id} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
										<td>
											<div className='mButtonsContainer'>
												<OpenModalButton
													buttonText={<i className='fa-regular fa-pen-to-square'></i>}
													modalComponent={<UpdateSaleModal sale={sale} />}
												/>
												<button id='trash' onClick={() => handleDelete(sale.id)}>
													<i className='fa-solid fa-trash'></i>
												</button>
											</div>
										</td>
										<td>{sale.accountNumber}</td>
										<td>{sale.planType}</td>
										<td>{sale.initialPrice}</td>
										<td>{sale.recurringPrice}</td>
										<td>{cv}</td>
										<td>{sale.agreementLength}</td>
										<td>{ez}</td>
										<td>0</td>
										<td>{sale.serviced}</td>
										<td>{sale.initialDate}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default SalesTrackerTable;
