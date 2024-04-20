import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_USER_SALES = "sales/LOAD_USER_SALES";
export const REMOVE_USER_SALE = "sales/REMOVE_USER_SALES"

/**  Action Creators: */
export const loadSales = (sales) => ({
	type: LOAD_USER_SALES,
	payload: sales,
});

export const removeSale = (saleId) => ({
    type: REMOVE_USER_SALE,
    payload: saleId
})

/** Thunk Action Creators: */
export const getUserSales = () => async (dispatch) => {
	const res = await csrfFetch("/api/sales/user-sales");
	if (res.ok) {
		const data = await res.json();
		dispatch(loadSales(data));
		return res;
	}
};

export const deleteSale = (saleId) => async (dispatch) => {
    const res = await csrfFetch(`/api/sales/${saleId}`, {
		method: "DELETE",
	});
    if (res.ok) {
        dispatch(removeSale(saleId))
        return Promise.resolve();
    } else {
		const errorData = await res.json();
		throw errorData;
	}
}

/** Reducer: */
const initialState = {
	isLoading: true,
	data: {},
};

const userSalesReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_USER_SALES: {
			const normalizeSales = {};
			action.payload.forEach((sale) => {
				normalizeSales[sale.id] = sale;
			});
			return { ...state, data: normalizeSales, isLoading: false };
		}
        case REMOVE_USER_SALE: {
			const newState = { ...state.data };
			delete newState[action.payload];
			return { ...state, data: newState, isLoading: false };
		}
		default:
			return state;
	}
};

export default userSalesReducer;
