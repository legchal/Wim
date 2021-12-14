export function SignRequest(email, password) {
  return { 
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password }
  }
}

export function signInSuccess(user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { user },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function verifyTokenRequest() {
  return {
    type: '@auth/VERIFY_TOKEN_REQUEST',
  }
}

export function verifyTokenSuccess(isValid) {
  return {
    type: '@auth/VERIFY_TOKEN_SUCCESS',
    payload: isValid
  }
}

export function verifyTokenFailure(isValid) {
  return {
    type: '@auth/VERIFY_TOKEN_FAILURE',
    payload: false
  }
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT'
  }
}