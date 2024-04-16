import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_LEADS = "leads/LOAD_LEADS";
export const REMOVE_LEAD = "leads/REMOVE_LEAD";
export const ADD_LEAD = "leads/ADD_LEAD";
export const UPDATE_LEAD = "leads/UPDATE_LEAD";

/**  Action Creators: */
export const loadLeads = (leads) => ({
	type: LOAD_LEADS,
	payload: leads.Leads,
});

export const removeLead = (leadId) => ({
	type: REMOVE_LEAD,
	payload: leadId,
});

export const addLead = (lead) => ({
	type: ADD_LEAD,
	payload: lead,
});

export const updateLead = (lead) => ({
	type: UPDATE_LEAD,
	payload: lead,
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

export const createLead = (data) => async (dispatch) => {
	const res = await csrfFetch("/api/leads", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (res.ok) {
		const lead = await res.json();
		dispatch(addLead(lead));
		return res;
	} else {
		const errorData = await res.json();
		throw errorData;
	}
};

export const editLead = (data, leadId) => async (dispatch) => {
	const res = await csrfFetch(`/api/leads/${leadId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (res.ok) {
		const lead = await res.json();
		dispatch(updateLead(lead));
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
			const newState = { ...state.data };
			delete newState[action.payload];
			return { ...state, data: newState, isLoading: false };
		}

		case ADD_LEAD: {
			return {
				...state,
				data: {
					...state.data,
					[action.payload.id]: action.payload,
				},
				isLoading: false,
			};
		}

		case UPDATE_LEAD: {
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

export default leadsReducer;
