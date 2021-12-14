const INITIAL_STATE = {
  allUsersAdm: [],
  loading: false,
  userById: {},
  created: [],
}

export default function usersAdm(state = INITIAL_STATE, action) {
  switch(action.type) {
    case '@userAdmin/GET_ALL_USERS_ADM_REQUEST':
      return { ...state, created: [], loading: true };
    case '@userAdmin/GET_ALL_USERS_ADM_SUCCESS':
      return { ...state, allUsersAdm: action.payload, loading: false }
    case '@userAdmin/GET_ALL_USERS_ADM_FAILURE':
      return { ...state, loading: false };
      case '@userAdmin/GET_USER_ADM_BY_ID_REQUEST':
        return { ...state, loading: true };
      case '@userAdmin/GET_USER_ADM_BY_ID_SUCCESS':
        return { ...state, userById: action.payload, loading: false }
      case '@userAdmin/GET_USER_ADM_BY_ID_FAILURE':
        return { ...state, loading: false };
      case '@userAdmin/CREATE_USER_ADM_REQUEST':
        return { ...state, loading: true };
      case '@userAdmin/CREATE_USER_ADM_SUCCESS':
        return { ...state, created: action.payload, loading: false }
      case '@userAdmin/CREATE_USER_ADM_FAILURE':
        return { ...state, loading: false };
      case '@userAdmin/EDIT_USER_ADM_REQUEST':
        return { ...state, loading: true };
      case '@userAdmin/EDIT_USER_ADM_SUCCESS':
        return { ...state, loading: false }
      case '@userAdmin/EDIT_USER_ADM_FAILURE':
        return { ...state, loading: false };
      case '@userAdmin/DESTROY_USER_ADM_REQUEST':
        return { ...state, loading: true };
      case '@userAdmin/DESTROY_USER_ADM_SUCESS':
        return { ...state, loading: false };
      case '@userAdmin/DESTROY_USER_ADM_FAILURE':
        return { ...state, loading: false };
      case '@userAdmin/CLEAR_USER_ADM':
        return {...state, userById: {} };
    default:
      return state;
  }
}