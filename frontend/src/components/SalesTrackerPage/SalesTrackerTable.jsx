import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { format } from "date-fns";
import Spinner from "../Spinner/Spinner";
import { deleteSale, getUserSales } from "../../store/userSales";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateSaleModal from "../UpdateSaleModal/UpdateSaleModal";
import NewSaleForm from "../NewSaleForm/NewSaleForm"
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";

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
		{
			field: "accountNumber",
			headerName: "Account",
			type: "number",
			width: 80,
			align: "right",
			headerAlign: "right",
			resizable: false,
		},
		{ field: "planType", headerName: "Plan", width: 100, align: "right", headerAlign: "right", resizable: false },
		{
			field: "initialPrice",
			headerName: "Initial",
			type: "number",
			align: "right",
			width: 80,
			headerAlign: "right",
			resizable: false,
		},
		{
			field: "recurringPrice",
			headerName: "Recurring",
			type: "number",
			align: "right",
			width: 100,
			headerAlign: "right",
			resizable: false,
		},
		{
			field: "CV",
			headerName: "CV",
			type: "number",
			width: 70,
			renderCell: (cellValues) => {
				const { planType, initialPrice, recurringPrice } = cellValues.row;
				let cv;
				switch (planType) {
					case "Basic":
						cv = Number(initialPrice) + Number(recurringPrice) * 4;
						break;
					case "Pro":
						cv = Number(initialPrice) + Number(recurringPrice) * 6;
						break;
					case "Premium":
						cv = Number(initialPrice) + Number(recurringPrice) * 8;
						break;
					default:
						cv = "N/A";
				}
				return cv;
			},
			resizable: false,
		},
		{
			field: "agreementLength",
			headerName: "Length",
			type: "number",
			align: "right",
			width: 80,
			headerAlign: "right",
			resizable: false,
		},
		{
			field: "EZ",
			headerName: "EZ Pay",
			width: 80,
			renderCell: (cellValues) => {
				const { autopay, ach } = cellValues.row;
				if (autopay && ach) {
					return "ACH";
				} else if (autopay && !ach) {
					return "CC";
				} else {
					return "None";
				}
			},
			resizable: false,
			align: "right",
			headerAlign: "right",
		},
		{
			field: "initialDate",
			headerName: "Date Scheduled",
			align: "right",
			width: 160,
			headerAlign: "right",
			valueFormatter: (params) => {
				return format(new Date(params), "MM/dd/yy");
			},
			resizable: false,
		},
		{ field: "serviced", headerName: "Serviced", width: 100, align: "right", headerAlign: "right" },
		{ field: "Action", headerName: "Action", width: 100, align: "right", headerAlign: "right" },

	];

	const paginationModel = { page: 0, pageSize: 5 };

	return (
		<>
			<Box sx={{
            width: "100%",
            display: "flex",
            marginBottom: "10px",
			paddingTop: "10px",
			paddingBottom: "0px",
			paddingLeft: "10px"

        }}>
            <OpenModalButton
                buttonText="Add Sale"
                modalComponent={<NewSaleForm />}
                cssClass={true}
                sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#1565c0" // Darker shade for hover
                    },
                    padding: "8px 16px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "500"
                }}
            />
        </Box>
			<Paper sx={{ height: 400, width: "100%" }}>
				<DataGrid
					rows={sales}
					columns={columns}
					initialState={{ pagination: { paginationModel } }}
					pageSizeOptions={[5, 10]}
					sx={{
						border: 0,
						"& .MuiDataGrid-columnHeader": {
							fontWeight: "bold",
							"& .MuiDataGrid-columnHeaderTitle": {
								fontWeight: "bold",
								textAlign: "right",
							},
						},
					}}
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
