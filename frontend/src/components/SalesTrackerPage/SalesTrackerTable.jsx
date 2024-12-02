import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { format } from "date-fns";
import Spinner from "../Spinner/Spinner";
import { deleteSale, getUserSales } from "../../store/userSales";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateSaleModal from "../UpdateSaleModal/UpdateSaleModal";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';


function SalesTrackerTable() {
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
		dispatch(deleteSale(saleId));
	};

	const columns = [
		{ field: "accountNumber", headerName: "Account", type: "number", width: 80, align: "right" },
		{ field: "planType", headerName: "Plan", width: 80, align: "right" },
		{ field: "initialPrice", headerName: "Initial", type: "number", width: 60 },
		{ field: "recurringPrice", headerName: "Recurring", type: "number", width: 80 },
		// { field: "cv", headerName: "CV", type: "number", width: 70 },
		{ field: "agreementLength", headerName: "Length", type: "number", width: 60 },
		// { field: "ez", headerName: "EZ Pay", width: 60 },
		{ field: "initialDate", headerName: "Date Scheduled", width: 130 },
		{ field: "serviced", headerName: "Serviced", width: 80 },
		{ field: "updatedAt", headerName: "Last Updated", width: 130 },
	];

	const paginationModel = { page: 0, pageSize: 5 };

	return (
		<>
			<Paper sx={{ height: 400, width: "100%" }}>
				<DataGrid
					rows={sales}
					columns={columns}
					initialState={{ pagination: { paginationModel } }}
					pageSizeOptions={[5, 10]}
					checkboxSelection
					sx={{ border: 0 }}
				></DataGrid>
			</Paper>

			{/* <div className='tableFixHead'>
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
							<th>Serviced</th>
							<th>Date Scheduled</th>
							<th>Last Updated</th>
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
										<td>{sale.serviced}</td>
										<td>{format(new Date(sale.initialDate), "MM/dd/yyyy")}</td>
										<td>{format(new Date(sale.updatedAt), "MM/dd HH:mm")}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div> */}
		</>
	);
}

export default SalesTrackerTable;
