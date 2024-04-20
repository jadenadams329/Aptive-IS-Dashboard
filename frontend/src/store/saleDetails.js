import _default from "react-redux/es/components/connect";
import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const ADD_SALE = "sales/ADD_SALE";

/**  Action Creators: */
export const addSale = (sale) => ({
	type: ADD_SALE,
	payload: sale,
});

/** Thunk Action Creators: */
export const createSale = (data) => async (dispatch) => {
	const res = await csrfFetch("/api/sales", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (res.ok) {
		const sale = await res.json();
		dispatch(addSale(sale));
		return res;
	} else {
		const errorData = await res.json();
		throw errorData;
	}
};

/** Reducer: */
const initialState = {
	isLoading: true,
	data: {},
};

const salesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_SALE: {
			return {
				...state,
				data: {
					...state.data,
					[action.payload.id]: action.payload,
				},
				isLoading: false,
			};
		}

		default:
			return state;
	}
};

export default salesReducer;
