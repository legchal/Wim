export function getPaymentsPerDateRequest(start, end) {
  return {
    type: '@finance/GET_ALL_PAYMENTS_PER_DATE_REQUEST',
    payload: { start, end },
  }
}

export function getPaymentsPerDateSuccess(payments) {
  return {
    type: '@finance/GET_ALL_PAYMENTS_PER_DATE_SUCCESS',
    payload: { payments },
  }
}

export function getPaymentsPerDateFailure() {
  return {
    type: '@finance/GET_ALL_PAYMENTS_PER_DATE_FAILURE',
  }
}

export function getPrevisionNewClinicsRequest() {
  return {
    type: '@finance/PREVISION_NEW_CLINICS_REQUEST',
  }
}

export function getPrevisionNewClinicsSuccess(data) {
  return {
    type: '@finance/PREVISION_NEW_CLINICS_SUCCESS',
    payload: { data },
  }
}

export function getPrevisionNewClinicsFailure() {
  return {
    type: '@finance/PREVISION_NEW_CLINICS_FAILURE',
  }
}

export function newExpenseRequest(data) {
  return {
    type: '@finance/NEW_EXPENSE_REQUEST',
    payload: { data },
  }
}

export function newExpenseSuccess() {
  return {
    type: '@finance/NEW_EXPENSE_SUCCESS',
  }
}

export function newExpenseFailure() {
  return {
    type: '@finance/NEW_EXPENSE_FAILURE',
  }
}

export function getAllCashFlowRequest(start, end) {
  return {
    type: '@finance/GET_ALL_CASH_FLOW_REQUEST',
    payload: { start, end }
  }
}

export function getAllCashFlowSuccess(data) {
  return {
    type: '@finance/GET_ALL_CASH_FLOW_SUCCESS',
    payload: { data },
  }
}

export function getAllCashFlowFailure() {
  return {
    type: '@finance/GET_ALL_CASH_FLOW_FAILURE',
  }
}

export function getCashFlowEditingRequest(id) {
  return {
    type: '@finance/GET_CASH_FLOW_EDITING_REQUEST',
    payload: { id }
  }
}

export function getCashFlowEditingSuccess(data) {
  return {
    type: '@finance/GET_CASH_FLOW_EDITING_SUCCESS',
    payload: { data },
  }
}

export function getCashFlowEditingFailure() {
  return {
    type: '@finance/GET_CASH_FLOW_EDITING_FAILURE',
  }
}

export function updateExpenseRequest(id, data) {
  return {
    type: '@finance/UPDATE_EXPENSE_REQUEST',
    payload: { id, data },
  }
}

export function updateExpenseSuccess() {
  return {
    type: '@finance/UPDATE_EXPENSE_SUCCESS',
  }
}

export function updateExpenseFailure() {
  return {
    type: '@finance/UPDATE_EXPENSE_FAILURE',
  }
}

export function deleteExpenseRequest(id, delete_all_installments) {
  return {
    type: '@finance/DELETE_EXPENSE_REQUEST',
    payload: { id, delete_all_installments },
  }
}

export function deleteExpenseSuccess() {
  return {
    type: '@finance/DELETE_EXPENSE_SUCCESS',
  }
}

export function deleteExpenseFailure() {
  return {
    type: '@finance/DELETE_EXPENSE_FAILURE',
  }
}

export function getRecipeRequest(start, end) {
  return {
    type: '@finance/GET_RECIPE_REQUEST',
    payload: { start, end },
  }
}

export function getRecipeSuccess(recipe) {
  return {
    type: '@finance/GET_RECIPE_SUCCESS',
    payload: { recipe }
  }
}

export function getRecipeFailure() {
  return {
    type: '@finance/GET_RECIPE_FAILURE',
  }
}

export function paidExpenseRequest(id) {
  return {
    type: '@finance/PAID_EXPENSE_REQUEST',
    payload: { id },
  }
}

export function paidExpenseSuccess() {
  return {
    type: '@finance/PAID_EXPENSE_SUCCESS',
  }
}

export function paidExpenseFailure() {
  return {
    type: '@finance/PAID_EXPENSE_FAILURE',
  }
}

export function activesPendingRequest(start) {
  return {
    type: '@finance/ACTIVES_PENDING_REQUEST',
    payload: { start },
  }
}

export function activesPendingSuccess(data) {
  return {
    type: '@finance/ACTIVES_PENDING_SUCCESS',
    payload: data
  }
}

export function activesPendingFailure() {
  return {
    type: '@finance/ACTIVES_PENDING_FAILURE',
  }
}

export function clearRecipe(){
  return {
    type: '@finance/CLEAR_RECIPE',
  }
}

export function clearActivesPending(){
  return {
    type: '@finance/ACTIVES_PENDING',
  }
}