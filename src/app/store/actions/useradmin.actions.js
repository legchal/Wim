export function getAllUsersRequest() {
  return {
    type: '@userAdmin/GET_ALL_USERS_ADM_REQUEST',
  }
}

export function getAllUsersSuccess(data) {
  return {
    type: '@userAdmin/GET_ALL_USERS_ADM_SUCCESS',
    payload: data,
  }
} 

export function getAllUsersFailure() {
  return {
    type: '@userAdmin/GET_ALL_USERS_ADM_FAILURE',
  }
}

export function getUserByIdRequest(id) {
  return {
    type: '@userAdmin/GET_USER_ADM_BY_ID_REQUEST',
    payload: id,
  }
} 

export function getUserByIdSuccess(user) {
  return {
    type: '@userAdmin/GET_USER_ADM_BY_ID_SUCCESS',
    payload: user,
  }
} 

export function getUserByIdFailure() {
  return {
    type: '@userAdmin/GET_USER_ADM_BY_ID_FAILURE',
  }
} 

export function createUserRequest(data) {
  return {
    type: '@userAdmin/CREATE_USER_ADM_REQUEST',
    payload: data
  }
}

export function createUserSucess(data) {
  return {
    type: '@userAdmin/CREATE_USER_ADM_SUCCESS',
    payload: data
  }
}

export function createUserFailure() {
  return {
    type: '@userAdmin/CREATE_USER_ADM_FAILURE',
  }
}

export function editUserRequest(data, id) {
  return {
    type: '@userAdmin/EDIT_USER_ADM_REQUEST',
    payload: { data, id },
  }
}

export function editUserSucess() {
  return {
    type: '@userAdmin/EDIT_USER_ADM_SUCCESS',
  }
}

export function editUserFailure() {
  return {
    type: '@userAdmin/EDIT_USER_ADM_FAILURE',
  }
}

export function destroyUserRequest(id) {
  return {
    type: '@userAdmin/DESTROY_USER_ADM_REQUEST',
    payload: { id },
  }
}

export function destroyUserSuccess() {
  return {
    type: '@userAdmin/DESTROY_USER_ADM_SUCESS',
  }
}

export function destroyUserFailure() {
  return {
    type: '@userAdmin/DESTROY_USER_ADM_FAILURE',
  }
}

export function clearUserById() {
  return {
    type: '@userAdmin/CLEAR_USER_ADM',
  }
}