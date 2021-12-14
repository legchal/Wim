const INITIAL_STATE = {
  loading: false,
  profile: {},
}

export default function profile(state = INITIAL_STATE, action) {
  switch(action.type) {
      case '@profile/GET_PROFILE_REQUEST':
        return { ...state, loading: true };
      case '@profile/GET_PROFILE_SUCCESS':
        return { ...state, profile: action.payload, loading: false }
      case '@profile/GET_PROFILE_FAILURE':
        return { ...state, loading: false };
      case '@profile/UPDATE_PROFILE_REQUEST':
        return { ...state, loading: true };
      case '@profile/UPDATE_PROFILE_SUCCESS':
        return { ...state, loading: false }
      case '@profile/UPDATE_PROFILE_FAILURE':
        return { ...state, loading: false };
      case '@profile/UPDATE_AVATAR_REQUEST':
        return { ...state, loading: true };
      case '@profile/UPDATE_AVATAR_SUCCESS':
        return { ...state, loading: false }
      case '@profile/UPDATE_AVATAR_FAILURE':
        return { ...state, loading: false };
    default:
      return state;
  }
}
