const INITIAL_STATE = {
  token: null,
  email: null,
  loading: false,
  tokenIsValid: false
};

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST':
        return { ...state, loading: true }; 
      case '@auth/SIGN_IN_SUCCESS':
          localStorage.setItem('@token', action.payload.user.token);
          localStorage.setItem('@email', action.payload.user.email);
          localStorage.setItem('@permission', action.payload.user.permission);
          localStorage.setItem('@avatar', action.payload.user.avatar);
        return { loading: false, email: action.payload.user.email, token: action.payload.user.token, tokenIsValid: true };
      case '@auth/SIGN_FAILURE':
        return { ...state, loading: false };
      case '@auth/SIGN_OUT':
       return { ...state, token: null, email: null, tokenIsValid: false };
      case '@auth/VERIFY_TOKEN_REQUEST':
        return state;
      case '@auth/VERIFY_TOKEN_SUCCESS':
        return { ...state, tokenIsValid: action.payload };
      case '@auth/VERIFY_TOKEN_FAILURE':
        return { ...state, tokenIsValid: action.payload };
      default:
        return state;
    }
}