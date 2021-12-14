export function getAllSalesRequest() {
    return {
      type: '@commission/GET_ALL_REQUEST'
    }
  }
  
  export function getAllSalesSuccess(sales) {
    return {
      type: '@commission/GET_ALL_SUCCESS',
      payload: sales
    }
  }
  
  export function getAllSalesFailure() {
    return {
      type: '@commission/GET_ALL_FAILURE'
    }
  }
  export function getAllSalesmansRequest() {
    return {
      type: '@commission/GET_ALL_SALESMANS_REQUEST'
    }
  }
  
  export function getAllSalesmansSuccess(sales) {
    return {
      type: '@commission/GET_ALL_SALESMANS_SUCCESS',
      payload: sales
    }
  }
  
  export function getAllSalesmansFailure() {
    return {
      type: '@commission/GET_ALL_SALESMANS_FAILURE'
    }
    
  }

  export function getSalesmanSalesRequest(id) {
    return {
      type: '@commission/GET_ALL_SALESMAN_SALES_REQUEST',
      payload: id
    }
  }
  
  export function getSalesmanSalesSuccess(sales) {
    return {
      type: '@commission/GET_ALL_SALESMAN_SALES_SUCCESS',
      payload: sales
    }
  }
  
  export function getSalesmanSalesFailure() {
    return {
      type: '@commission/GET_ALL_SALESMAN_SALES_FAILURE'
    }
  }
  