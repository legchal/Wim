  export function getAllStatesRequest() {
    return {
      type: '@users/GET_ALL_STATES_REQUEST'
    }
  }
  
  export function getAllStatesSuccess(allStates) {
    return {
      type: '@users/GET_ALL_STATES_SUCCESS',
      payload: allStates
    }
  }
  
  export function getAllStatesFailure() {
    return {
      type: '@users/GET_ALL_STATES_FAILURE'
    }
  }

  export function getUserWimRequest(id) {
    return {
      type: '@users/GET_USER_WIM_REQUEST',
      payload: { id },
    }
  }
  
  export function getUserWimSuccess(UserWim) {
    return {
      type: '@users/GET_USER_WIM_SUCCESS',
      payload: UserWim
    }
  }
  
  export function getUserWimFailure() {
    return {
      type: '@users/GET_USER_WIM_FAILURE'
    }
  }

  export function updateUserWimRequest(data, id) {
    return {
      type: '@users/UPDATE_USER_WIM_REQUEST',
      payload: { data, id },
    }
  }
  
  export function updateUserWimSuccess(userUpdate) {
    return {
      type: '@users/UPDATE_USER_WIM_SUCCESS',
      payload: userUpdate
    }
  }
  
  export function updateUserWimFailure() {
    return {
      type: '@users/UPDATE_USER_WIM_FAILURE'
    }
  }

  export function resetRequest(id) {
    return {
      type: '@users/RESET_REQUEST',
      payload: id,
    }
  }
  
  export function resetSuccess(reset) {
    return {
      type: '@users/RESET_SUCCESS',
      payload: reset
    }
  }
  
  export function resetFailure() {
    return {
      type: '@users/RESET_FAILURE'
    }
  }