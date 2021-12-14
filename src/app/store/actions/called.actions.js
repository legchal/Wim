export function getAllUsersRequest() {
  return {
    type: '@called/GET_ALLUSERS_REQUEST',
  }
}

export function getAllUsersSuccess(Users) {
  return {
    type: '@called/GET_ALLUSERS_SUCCESS',
    payload: Users
  }
}

export function getAllUsersFailure() {
  return {
    type: '@called/GET_ALLUSERS_FAILURE'
  }
}

export function allCalledRequest(start, end) {
  return {
    type: '@called/ALL_CALLED_REQUEST',
    payload: {start, end}
  }
}

export function allCalledSuccess(calleds) {
  return {
    type: '@called/ALL_CALLED_SUCCESS',
    payload: { calleds },
  }
}

export function allCalledFailure() {
  return {
    type: '@called/ALL_CALLED_FAILURE'
  }
}

export function allCalledOpenRequest() {
  return {
    type: '@called/ALL_CALLED_OPEN_REQUEST'
  }
}

export function allCalledOpenSuccess(allCalledOpen) {
  return {
    type: '@called/ALL_CALLED_OPEN_SUCCESS',
    payload: { allCalledOpen },
  }
}

export function allCalledOpenFailure() {
  return {
    type: '@called/ALL_CALLED_OPEN_FAILURE'
  }
}

export function addCalledRequest(data) {
  return {
    type: '@called/ADDCALLED_REQUEST',
    payload: { data },
  }
}

export function addCalledSuccess() {
  return {
    type: '@called/ADDCALLED_SUCCESS',
  }
}

export function addCalledFailure() {
  return {
    type: '@called/ADDCALLED_FAILURE'
  }
}

export function getCalledByIdRequest(id) {
  return{
    type: '@called/CALLED_BYID_REQUEST',
    payload: { id },
  }
}

export function getCalledByIdSuccess(data){
  return{
    type: '@called/CALLED_BYID_SUCCESS',
    payload: { data }
  }
}

export function getCalledByIdFailure(){
  return{
    type: '@called/CALLED_BYID_FAILURE'
  }
}

export function updateCalledRequest( id, data ) {
  return{
    type: '@called/CALLED_UPDATE_REQUEST',
    payload: { id, data }
  }
}

export function updateCalledSuccess(){
  return{
    type:'@called/CALLED_UPDATE_SUCCESS'
  }
}

export function updateCalledFailure() {
  return{
    type: '@called/CALLED_UPDATE_FAILURE'
  }
}

export function updateCalledStatusRequest( id, data ) {
  return{
    type: '@called/CALLED_UPDATE_STATUS_REQUEST',
    payload: { id, data }
  }
}

export function updateCalledStatusSuccess(){
  return{
    type:'@called/CALLED_UPDATE_STATUS_SUCCESS'
  }
}

export function updateCalledStatusFailure() {
  return{
    type: '@called/CALLED_UPDATE_STATUS_FAILURE'
  }
}

export function getMessagesFromCalledsRequest( id ) {
  return{
    type: '@called/GET_MESSAGES_FROM_CALLEDS_REQUEST',
    payload: { id }
  }
}

export function getMessagesFromCalledsSuccess(data){
  return{
    type:'@called/GET_MESSAGES_FROM_CALLEDS_SUCCESS',
    payload: { data }
  }
}

export function getMessagesFromCalledsFailure() {
  return{
    type: '@called/GET_MESSAGES_FROM_CALLEDS_FAILURE'
  }
}

export function createMessageFromCalledRequest(data) {
  return{
    type: '@called/CREATE_MESSAGE_FROM_CALLED_REQUEST',
    payload: { called_id: data.called_id, message: data.message }
  }
}

export function createMessageFromCalledSuccess(data){
  return{
    type:'@called/CREATE_MESSAGE_FROM_CALLED_SUCCESS',
    payload: { data }
  }
}

export function createMessageFromCalledFailure() {
  return{
    type: '@called/CREATE_MESSAGE_FROM_CALLED_FAILURE'
  }
}
 // WIM DENTAL REQUISIÇÕES //
export function allCalledOpenWimDentalRequest() {
  return {
    type: '@called/ALL_CALLED_OPEN_WIM_DENTAL_REQUEST',
  }
}

export function allCalledOpenWimDentalSuccess(seeOpens) {
  return {
    type: '@called/ALL_CALLED_OPEN_WIM_DENTAL_SUCCESS',
    payload:  seeOpens ,
  }
}

export function allCalledOpenWimDentalFailure() {
  return {
    type: '@called/ALL_CALLED_OPEN_WIM_DENTAL_FAILURE'
  }
}