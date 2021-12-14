const INITIAL_STATE = {
    allTicket: [],
  }


export default function ticket(state = INITIAL_STATE, action) {
    switch(action.type) {
      case '@ticket/GET_ALL_TICKET_REQUEST':
        return { ...state, loading: true };
      case '@ticket/GET_ALL_TICKET_SUCCESS':
        return { ...state, allTicket: action.payload, loading: false }
      case '@ticket/GET_ALL_TICKET_FAILURE':
        return { ...state, loading: false };
    default:
        return state;
    }
}