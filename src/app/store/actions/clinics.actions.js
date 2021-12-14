export function getAllStatesRequest() {
  return {
    type: '@clinics/GET_ALL_STATES_REQUEST'
  }
}


export function getAllStatesSuccess(clinicsInactives, allClinicsAndInterval, clinicsActives, realActives) {
  return {
    type: '@clinics/GET_ALL_STATES_SUCCESS',
    payload: {
      clinicsInactives, 
      allClinicsAndInterval, 
      clinicsActives,
      realActives
    }
  }
}

export function getAllStatesFailure() {
  return {
    type: '@clinics/GET_ALL_STATES_FAILURE'
  }
}

export function getClinicWimRequest(id) {
  return {
    type: '@clinics/GET_CLINIC_WIM_REQUEST',
    payload: id,
  }
}

export function getClinicWimSuccess(clinic) {
  return {
    type: '@clinics/GET_CLINIC_WIM_SUCCESS',
    payload: clinic
  }
}

export function getClinicWimFailure() {
  return {
    type: '@clinics/GET_CLINIC_WIM_FAILURE'
  }
}

export function updateClinicWimRequest(data, id) {
  return {
    type: '@clinics/UPDATE_CLINIC_WIM_REQUEST',
    payload: { data, id },
  }
}

export function updateClinicWimSuccess(clinic) {
  return {
    type: '@clinics/UPDATE_CLINIC_WIM_SUCCESS',
    payload: clinic
  }
}

export function updateClinicWimFailure() {
  return {
    type: '@clinics/UPDATE_CLINIC_WIM_FAILURE'
  }
}

export function getUsersClinicRequest(id) {
  return {
    type: '@clinics/GET_USERS_CLINIC_REQUEST',
    payload: id,
  }
}

export function getUsersClinicSuccess(users) {
  return {
    type: '@clinics/GET_USERS_CLINIC_SUCCESS',
    payload: users
  }
}

export function getUsersClinicFailure() {
  return {
    type: '@clinics/GET_USERS_CLINIC_FAILURE'
  }
}

export function destroyClinicRequest(id) {
  return {
    type: '@clinics/DESTROY_CLINIC_REQUEST',
    payload: { id },
  }
}

export function destroyClinicSuccess() {
  return {
    type: '@clinics/DESTROY_CLINIC_SUCCESS',
  }
}

export function destroyClinicFailure() {
  return {
    type: '@clinics/DESTROY_CLINIC_FAILURE',
  }
}


export function verifyPasswordRequest(password) {
  return {
    type: '@clinics/VERIFY_PASSWORD_REQUEST',
    payload: { password },
  }
}

export function verifyPasswordSuccess(message) {
  return {
    type: '@clinics/VERIFY_PASSWORD_SUCCESS',
    payload: message,
  }
}

export function verifyPasswordFailure() {
  return {
    type: '@clinics/VERIFY_PASSWORD_FAILURE',
  }
}

export function clearVerify() {
  return {
    type: '@clinics/CLEAR_VERIFY',
  }
}

export function releaseAccessRequest(id) {
  return {
    type: '@clinics/RELEASE_ACCESS_REQUEST',
    payload: { id },
  }
}

export function releaseAccessSuccess(message) {
  return {
    type: '@clinics/RELEASE_ACCESS_SUCCESS',
    payload: message,
  }
}

export function releaseAccessFailure() {
  return {
    type: '@clinics/RELEASE_ACCESS_FAILURE',
  }
}

export function getPaidSubscriptionsRequest(id){
  return{
    type: '@clinics/GET_PAID_SUBSCRIPTIONS_REQUEST',
    payload: {id},
  }
}

export function getPaidSubscriptionsSuccess(data){
  return{
    type: '@clinics/GET_PAID_SUBSCRIPTIONS_SUCCESS',
    payload: {data},
  }
}

export function getPaidSubscriptionsFailure(){
  return{
    type: '@clinics/GET_PAID_SUBSCRIPTIONS_FAILURE'
  }
}

export function updateEndPaidSubscriptionRequest( id, date){
  return{
    type: '@clinics/UPDATE_END_PAID_SUBSCRIPTIONS_REQUEST',
    payload: { id, date}
  }
}

export function updateEndPaidSubscriptionSuccess(data){
  return{
    type: '@clinics/UPDATE_END_PAID_SUBSCRIPTIONS_SUCCESS',
    payload: {data}

  }
}

export function updateEndPaidSubscriptionFailure(){
  return{
    type: '@clinics/UPDATE_END_PAID_SUBSCRIPTIONS_FAILURE'
  }
}

export function getSubscriptionsRequest(id){
  return{
    type: '@clinics/GET_SUBSCRIPTIONS_REQUEST',
    payload: {id},
  }
}

export function getSubscriptionsSuccess(data){
  return{
    type: '@clinics/GET_SUBSCRIPTIONS_SUCCESS',
    payload: {data},
  }
}

export function getSubscriptionsFailure(){
  return{
    type: '@clinics/GET_SUBSCRIPTIONS_FAILURE'
  }
}

export function updateSubscriptionRequest( id, date){
  return{
    type: '@clinics/UPDATE_SUBSCRIPTIONS_REQUEST',
    payload: { id, date}
  }
}

export function updateSubscriptionSuccess(data, error){
  return{
    type: '@clinics/UPDATE_SUBSCRIPTIONS_SUCCESS',
    payload: {data, error}
  }
}

export function updateSubscriptionFailure(error){
  return{
    type: '@clinics/UPDATE_SUBSCRIPTIONS_FAILURE',
    payload : {error}
  }
}

export function resetUpdateSubscriptions(){
  return{
    type: '@clinics/RESET_UPDATE_SUBSCRIPTIONS'
  }
}

export function deleteRecurrencyRequest(data){
  return{
    type: '@clinics/DELETE_RECURRENCY_REQUEST',
    payload: { data }
  }
}

export function deleteRecurrencySuccess(data){
  return{
    type: '@clinics/DELETE_RECURRENCY_SUCCESS',
    payload: { data }
  }
}

export function deleteRecurrencyFailure(error){
  return{
    type: '@clinics/DELETE_RECURRENCY_FAILURE',
    payload: { error },
  }
}

export function changeCardRequest(data ){
  return{
    type: '@clinics/CHANGE_CARD_REQUEST',
    payload: { data  }
  }
}

export function changeCardSuccess(data){
  return{
    type: '@clinics/CHANGE_CARD_SUCCESS',
    payload: { data }
  }
}

export function changeCardFailure(error){
  return{
    type: '@clinics/CHANGE_CARD_FAILURE',
    payload: { error },
  }
}

