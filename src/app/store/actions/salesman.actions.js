export function getAllSalesmanRequest() {
  return {
    type: '@salesman/GET_ALL_REQUEST'
  }
}

export function getAllSalesmanSuccess(allSalesman) {
  return {
    type: '@salesman/GET_ALL_SUCCESS',
    payload: allSalesman
  }
}

export function getAllSalesmanFailure() {
  return {
    type: '@salesman/GET_ALL_FAILURE'
  }
}

export function createSalesmanRequest(data) {
  return {
    type: '@salesman/CREATE_SALESMAN_REQUEST',
    payload: data
  }
}

export function createSalesmanSuccess(data) {
  return {
    type: '@salesman/CREATE_SALESMAN_SUCCESS',
    payload: data
  }
}

export function createSalesmanFailure() {
  return {
    type: '@salesman/CREATE_SALESMAN_FAILURE',
  }
}

export function getAllSalesRequest(id) {
  return {
    type: '@salesman/GET_ALL_SALES_REQUEST',
    payload: id
  }
}

export function getAllSalesSuccess(data) {
  return {
    type: '@salesman/GET_ALL_SALES_SUCCESS',
    payload: data
  }
}

export function getAllSalesFailure() {
  return {
    type: '@salesman/GET_ALL_SALES_FAILURE',
  }
}

export function getSalesmanByIdRequest(id) {
  return {
    type: '@salesman/GET_SALESMAN_BY_ID_REQUEST',
    payload: id
  }
}

export function getSalesmanByIdSuccess(salesman) {
  return {
    type: '@salesman/GET_SALESMAN_BY_ID_SUCCESS',
    payload: salesman
  }
}

export function getSalesmanByIdFailure() {
  return {
    type: '@salesman/GET_SALESMAN_BY_ID_FAILURE',
  }
}