import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSale } from "../../store/saleDetails";

function NewSaleForm({lead}) {
	const { closeModal } = useModal();
	const dispatch = useDispatch();
	const [accountNumber, setAccountNumber] = useState("");
	const [agreementLength, setAgreementLength] = useState("");
	const [planType, setPlanType] = useState("");
	const [initialPrice, setInitialPrice] = useState("");
	const [recurringPrice, setRecurringPrice] = useState("");
	const [payment, setPayment] = useState("");
	const [initialServiceDate, setInitialServiceDate] = useState("");

	console.log(lead)

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = {
			accountNumber,
			agreementLength,
			planType,
			initialPrice,
			recurringPrice,
			payment,
			initialServiceDate,
		};

		let autopay;
		let ach;

		if (payment === "None") {
			autopay = false;
			ach = false;
		} else if (payment === "Credit Card") {
			autopay = true;
			ach = false;
		} else {
			autopay = true;
			ach = true;
		}

		if (formData) {
			const safeSale = {
				leadId: lead.id,
				accountNumber,
				agreementLength: parseInt(agreementLength),
				planType,
				initialPrice,
				recurringPrice,
				autopay: autopay,
				ach: ach,
				initialDate: initialServiceDate
			}
			try {
				await dispatch(createSale(safeSale));
				closeModal();
			} catch (err) {
				console.error(err)
			}
		}
	};
	return (
		<>
			<div>
				<h2>Enter Sale Details</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Account Number</label>
						<input
							type='number'
							value={accountNumber}
							onChange={(e) => setAccountNumber(e.target.value)}
							required
						></input>
					</div>
					<div>
						<label>Agreement Length</label>
						<div>
							<input
								type='radio'
								id='oneYear'
								name='agreement'
								value='12'
								onChange={(e) => setAgreementLength(e.target.value)}
								required
							/>
							<label htmlFor='oneYear'>1 year</label>
						</div>
						<div>
							<input
								type='radio'
								id='twoYears'
								name='agreement'
								value='24'
								onChange={(e) => setAgreementLength(e.target.value)}
							/>
							<label htmlFor='twoYears'>2 years</label>
						</div>
					</div>
					<div>
						<label>Plan Type</label>
						<div>
							<input
								type='radio'
								id='basic'
								name='plan'
								value='Basic'
								onChange={(e) => setPlanType(e.target.value)}
								required
							/>
							<label htmlFor='basic'>Basic</label>
						</div>
						<div>
							<input type='radio' id='pro' name='plan' value='Pro' onChange={(e) => setPlanType(e.target.value)} />
							<label htmlFor='pro'>Pro</label>
						</div>
						<div>
							<input
								type='radio'
								id='premium'
								name='plan'
								value='Premium'
								onChange={(e) => setPlanType(e.target.value)}
							/>
							<label htmlFor='premium'>Premium</label>
						</div>
					</div>
					<div>
						<label>Initial Price</label>
						<input
							type='number'
							value={initialPrice}
							onChange={(e) => setInitialPrice(e.target.value)}
							required
						></input>
					</div>
					<div>
						<label>Recurring Price</label>
						<input
							type='number'
							value={recurringPrice}
							onChange={(e) => setRecurringPrice(e.target.value)}
							required
						></input>
					</div>
					<div>
						<label>Autopay</label>
						<div>
							<input
								type='radio'
								id='none'
								name='autopay'
								value='None'
								onChange={(e) => setPayment(e.target.value)}
								required
							/>
							<label htmlFor='none'>None</label>
						</div>
						<div>
							<input
								type='radio'
								id='creditCard'
								name='autopay'
								value='Credit Card'
								onChange={(e) => setPayment(e.target.value)}
							/>
							<label htmlFor='creditCard'>Credit Card</label>
						</div>
						<div>
							<input type='radio' id='ach' name='autopay' value='ACH' onChange={(e) => setPayment(e.target.value)} />
							<label htmlFor='ach'>ACH</label>
						</div>
					</div>
					<div>
						<label>Initial Service Date</label>
						<input
							type='date'
							value={initialServiceDate}
							onChange={(e) => setInitialServiceDate(e.target.value)}
							required
						></input>
					</div>
					<button type='submit'>Submit</button>
				</form>
			</div>
		</>
	);
}

export default NewSaleForm;
