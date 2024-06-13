import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_GOALS = "goals/LOAD_GOALS";
export const REMOVE_GOAL = "goals/REMOVE_GOAL";
export const ADD_GOAL = "goals/ADD_GOAL";
export const UPDATE_GOAL = "goals/UPDATE_GOAL";

/**  Action Creators: */
export const loadGoals = (goals) => ({
	type: LOAD_GOALS,
	payload: goals,
});

export const removeGoal = (goalId) => ({
	type: REMOVE_GOAL,
	payload: goalId,
});

export const addGoal = (goal) => ({
	type: ADD_GOAL,
	payload: goal,
});

export const updateGoal = (goal) => ({
	type: UPDATE_GOAL,
	payload: goal,
});

/** Thunk Action Creators: */
export const getAllGoals = () => async (dispatch) => {
	const res = await csrfFetch("/api/goals");
	if (res.ok) {
		const data = await res.json();
		dispatch(loadGoals(data));
		return res;
	}
};

export const deleteGoal = (goalId) => async (dispatch) => {
	const res = await csrfFetch(`/api/goals/${goalId}`, {
		method: "DELETE",
	});
	if (res.ok) {
		dispatch(removeGoal(goalId));
		return Promise.resolve();
	} else {
		const errorData = await res.json();
		throw errorData;
	}
};

export const createGoal = (data) => async (dispatch) => {
	const res = await csrfFetch("/api/goals", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (res.ok) {
		const goal = await res.json();
		dispatch(addGoal(goal));
		return res;
	} else {
		const errorData = await res.json();
		throw errorData;
	}
};

export const editGoal = (data, goalId) => async (dispatch) => {
	const res = await csrfFetch(`/api/goals/${goalId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (res.ok) {
		const goal = await res.json();
		dispatch(updateGoal(goal));
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

const goalsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_GOALS: {
			const normalizeGoals = {};
			action.payload.forEach((goal) => {
				normalizeGoals[goal.id] = goal;
			});
			return { ...state, data: normalizeGoals, isLoading: false };
		}

		case REMOVE_GOAL: {
			const newState = { ...state.data };
			delete newState[action.payload];
			return { ...state, data: newState, isLoading: false };
		}

		case ADD_GOAL: {
			return {
				...state,
				data: {
					...state.data,
					[action.payload.id]: action.payload,
				},
				isLoading: false,
			};
		}

		case UPDATE_GOAL: {
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

export default goalsReducer;
