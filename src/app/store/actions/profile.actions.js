export function getProfileRequest() {
  return {
    type: '@profile/GET_PROFILE_REQUEST',
  }
}

export function getProfileSuccess(Profile) {
  return {
    type: '@profile/GET_PROFILE_SUCCESS',
    payload: Profile
  }
}

export function getProfileFailure() {
  return {
    type: '@profile/GET_PROFILE_FAILURE'
  }
}

export function updateProfileRequest(data) {
  return {
    type: '@profile/UPDATE_PROFILE_REQUEST',
    payload: { data },
  }
}

export function updateProfileSuccess() {
  return {
    type: '@profile/UPDATE_PROFILE_SUCCESS',
  }
}

export function updateProfileFailure() {
  return {
    type: '@profile/UPDATE_PROFILE_FAILURE'
  }
}

export function updateAvatarRequest(data) {
  return {
    type: '@profile/UPDATE_AVATAR_REQUEST',
    payload: { data },
  }
}

export function updateAvatarSuccess() {
  return {
    type: '@profile/UPDATE_AVATAR_SUCCESS',
  }
}

export function updateAvatarFailure() {
  return {
    type: '@profile/UPDATE_AVATAR_FAILURE'
  }
}