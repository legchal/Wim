const INITIAL_STATE = {
    loading: false,
    allStates: [],
    UserWim: {},
    userUpdate: {},
    reset: {},
  }
  
  export default function users(state = INITIAL_STATE, action) {
    switch(action.type) {
        case '@users/GET_ALL_STATES_REQUEST':
          return { ...state, loading: true };
        case '@users/GET_ALL_STATES_SUCCESS':
          return { ...state, allStates: action.payload, loading: false }
        case '@users/GET_ALL_STATES_FAILURE':
          return { ...state, loading: false };
        case '@users/GET_USER_WIM_REQUEST':
          return { ...state, loading: true };
        case '@users/GET_USER_WIM_SUCCESS':
          return { ...state, UserWim: action.payload, loading: false }
        case '@users/GET_USER_WIM_FAILURE':
          return { ...state, loading: false };
        case '@users/UPDATE_USER_WIM_REQUEST':
          return { ...state, loading: true };
        case '@users/UPDATE_USER_WIM_SUCCESS':
          return { ...state, userUpdate: action.payload, loading: false }
        case '@users/UPDATE_USER_WIM_FAILURE':
          return { ...state, loading: false };
        case '@users/RESET_REQUEST':
          return { ...state, loading: true };
        case '@users/RESET_SUCCESS':
          return { ...state, reset: action.payload, loading: false }
        case '@users/RESET_FAILURE':
          return { ...state, loading: false };
      default:
        return state;
    }
  }
  