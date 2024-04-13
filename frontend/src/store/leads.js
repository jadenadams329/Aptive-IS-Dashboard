import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_LEADS = "leads/LOAD_LEADS";
const REMOVE_LEAD = "restaurants/REMOVE_LEAD";

/**  Action Creators: */
export const loadLeads = (leads) => ({
	type: LOAD_LEADS,
	payload: leads.Leads,
});

export const removeLead = (leadId) => ({
	type: REMOVE_LEAD,
	payload: leadId,
});

/** Thunk Action Creators: */
export const getAllLeads = () => async (dispatch) => {
	const res = await csrfFetch("/api/leads");
	if (res.ok) {
		const data = await res.json();
		dispatch(loadLeads(data));
		return res;
	}
};

export const deleteLead = (leadId) => async (dispatch) => {
	const res = await csrfFetch(`/api/leads/${leadId}`, {
		method: "DELETE",
	});
	if (res.ok) {
		dispatch(removeLead(leadId));
		return Promise.resolve();
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

const leadsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_LEADS: {
			const normalizeLeads = {};
			action.payload.forEach((lead) => {
				normalizeLeads[lead.id] = lead;
			});
			return { ...state, data: normalizeLeads, isLoading: false };
		}

		case REMOVE_LEAD: {
			const newState = {...state.data}
			delete newState[action.payload]
			return { ...state, data: newState, isLoading: false };
		}

		default:
			return state;
	}
};

export default leadsReducer;
