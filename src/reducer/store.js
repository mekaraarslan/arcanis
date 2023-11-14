export const initialState = {
    planets: [],
    loading: false,
    error: null,
    open: false,
};

export function planetReducer(state, action) {
    switch (action.type) {
        case 'SET_PLANETS':
            return { ...state, planets: action.payload, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

