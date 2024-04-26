import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editSale } from "../../store/userSales";

function UpdateSaleModal({ sale }) {
	const { closeModal } = useModal();
	const dispatch = useDispatch();
	const [accountNumber, setAccountNumber] = useState(sale?.accountNumber);
	const [agreementLength, setAgreementLength] = useState(sale?.agreementLength);
	const [planType, setPlanType] = useState(sale?.planType);
	const [initialPrice, setInitialPrice] = useState(sale?.initialPrice);
	const [recurringPrice, setRecurringPrice] = useState(sale?.recurringPrice);
	const [payment, setPayment] = useState(() => {
		if (!sale.autopay && !sale.ach) {
			return "None";
		} else if (sale.autopay && !sale.ach) {
			return "Credit Card";
		} else if (sale.autopay && sale.ach) {
			return "ACH";
		}
	});
	const [initialServiceDate, setInitialServiceDate] = useState(sale?.initialServiceDate);

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
				leadId: sale.leadId,
				accountNumber,
				agreementLength: parseInt(agreementLength),
				planType,
				initialPrice,
				recurringPrice,
				autopay: autopay,
				ach: ach,
				initialDate: initialServiceDate,
			};
			try {
				await dispatch(editSale(safeSale, sale.id));
				closeModal();
			} catch (err) {
				console.error(err);
			}
		}
	};
	return (
		<>
			<h2 className='nlHeader'>Edit Sale Details</h2>
			<div className='formContainer'>
				<form onSubmit={handleSubmit}>
					<div className="nsFormContainer">
						<div className="nlSection">
							<label>Account Number</label>
							<input
								type='number'
								value={accountNumber}
								onChange={(e) => setAccountNumber(e.target.value)}
								required
							></input>
						</div>
						<div>
							<label id="label">Agreement Length</label>
							<div>
								<input
									type='radio'
									id='oneYear'
									name='agreement'
									value='12'
									checked={agreementLength == "12"}
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
									checked={agreementLength == "24"}
									onChange={(e) => setAgreementLength(e.target.value)}
								/>
								<label htmlFor='twoYears'>2 years</label>
							</div>
						</div>
						<div>
							<label id="label">Plan Type</label>
							<div>
								<input
									type='radio'
									id='basic'
									name='plan'
									value='Basic'
									checked={planType === "Basic"}
									onChange={(e) => setPlanType(e.target.value)}
									required
								/>
								<label htmlFor='basic'>Basic</label>
							</div>
							<div>
								<input
									type='radio'
									id='pro'
									name='plan'
									value='Pro'
									checked={planType === "Pro"}
									onChange={(e) => setPlanType(e.target.value)}
								/>
								<label htmlFor='pro'>Pro</label>
							</div>
							<div>
								<input
									type='radio'
									id='premium'
									name='plan'
									value='Premium'
									checked={planType === "Premium"}
									onChange={(e) => setPlanType(e.target.value)}
								/>
								<label htmlFor='premium'>Premium</label>
							</div>
						</div>
						<div className="nlSection">
							<label>Initial Price</label>
							<input
								id="initialPrice"
								type='number'
								value={initialPrice}
								onChange={(e) => setInitialPrice(e.target.value)}
								required
							></input>
						</div>
						<div className="nlSection">
							<label>Recurring Price</label>
							<input
								id="recurringPrice"
								type='number'
								value={recurringPrice}
								onChange={(e) => setRecurringPrice(e.target.value)}
								required
							></input>
						</div>
						<div>
							<label id="label">Autopay</label>
							<div>
								<input
									type='radio'
									id='none'
									name='autopay'
									value='None'
									checked={payment === "None"}
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
									checked={payment === "Credit Card"}
									onChange={(e) => setPayment(e.target.value)}
								/>
								<label htmlFor='creditCard'>Credit Card</label>
							</div>
							<div>
								<input
									type='radio'
									id='ach'
									name='autopay'
									value='ACH'
									checked={payment === "ACH"}
									onChange={(e) => setPayment(e.target.value)}
								/>
								<label htmlFor='ach'>ACH</label>
							</div>
						</div>
						<div className="nlSection">
							<label>Initial Service Date</label>
							<input
								id="initialDate"
								type='date'
								value={initialServiceDate}
								onChange={(e) => setInitialServiceDate(e.target.value)}
								required
							></input>
						</div>
						<button className='formSubmit' type='submit'>Submit</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default UpdateSaleModal;
