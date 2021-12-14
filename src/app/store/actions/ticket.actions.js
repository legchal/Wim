export function getAllTicketRequest() {
    return {
      type: '@ticket/GET_ALL_TICKET_REQUEST'
    }
  }
  
  export function getAllTicketSuccess(allTicket) {
    return {
      type: '@ticket/GET_ALL_TICKET_SUCCESS',
      payload: allTicket
    }
  }
  
  export function getAllTicketFailure() {
    return {
      type: '@ticket/GET_ALL_TICKET_FAILURE'
    }
  }