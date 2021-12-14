const INITIAL_STATE = {
  loading: false,
  called: {},
  users: [],
  allCalleds: [{}],
  allCalledOpen: [],
  calledById: null,
  messages: [],
  messageCreated: [],
  seeOpens: 0,
}

export default function called(state = INITIAL_STATE, action) {
  switch(action.type) {
      case '@called/GET_ALLUSERS_REQUEST':
        return { ...state, loading: true };
      case '@called/GET_ALLUSERS_SUCCESS':
        return { ...state, users: action.payload, loading: false }
      case '@called/GET_ALLUSERS_FAILURE':
        return { ...state, loading: false };
      case '@called/ADDCALLED_REQUEST':
        return { ...state, loading: true };
      case '@called/ADDCALLED_SUCCESS':
        return { ...state, loading: false }
      case '@called/ADDCALLED_FAILURE':
        return { ...state, loading: false };
      case '@called/ALL_CALLED_REQUEST':
        return { ...state, loading: true }
      case '@called/ALL_CALLED_SUCCESS':
        return { ...state, allCalleds: action.payload, loading: false }
      case '@called/ALL_CALLED_FAILURE':
        return { ...state, loading: false }
      case '@called/ALL_CALLED_OPEN_REQUEST':
        return { ...state, loading: true }
      case '@called/ALL_CALLED_OPEN_SUCCESS':
        return { ...state, allCalledOpen: action.payload, loading: false }
      case '@called/ALL_CALLED_OPEN_FAILURE':
        return { ...state, loading: false }
      case '@called/CALLED_BYID_REQUEST':
        return { ...state, loading: true}
      case '@called/CALLED_BYID_SUCCESS':
        return { ...state, calledById: action.payload, loading: false}
      case '@called/CALLED_BYID_FAILURE':
        return { ...state, loading: false}
      case '@called/CALLED_UPDATE_REQUEST':
        return { ...state, loading: true}
      case '@@called/CALLED_UPDATE_SUCCESS':
        return { ...state, loading: false}
      case '@called/CALLED_UPDATE_FAILURE':
        return { ...state, loading: false}
      case '@called/CALLED_UPDATE_STATUS_REQUEST':
        return { ...state, loading: true}
      case '@called/CALLED_UPDATE_STATUS_SUCCESS':
        return { ...state, loading: false}
      case '@called/CALLED_UPDATE_STATUS_FAILURE':
        return { ...state, loading: false}
      case '@called/GET_MESSAGES_FROM_CALLEDS_REQUEST':
        return { ...state, loading: true}
      case '@called/GET_MESSAGES_FROM_CALLEDS_SUCCESS':
        return { ...state, messages: action.payload.data, messageCreated: [], loading: false}
      case '@called/GET_MESSAGES_FROM_CALLEDS_FAILURE':
        return { ...state, loading: false}
      case '@called/CREATE_MESSAGE_FROM_CALLED_REQUEST':
        return { ...state, loading: true}
      case '@called/CREATE_MESSAGE_FROM_CALLED_SUCCESS':
        return { ...state, messageCreated: action.payload.data, loading: false}
      case '@called/CREATE_MESSAGE_FROM_CALLED_FAILURE':
        return { ...state, loading: false}
      case '@called/ALL_CALLED_OPEN_WIM_DENTAL_REQUEST':
        return { ...state, loading: true }
      case '@called/ALL_CALLED_OPEN_WIM_DENTAL_SUCCESS':
        return { ...state, seeOpens: action.payload, loading: false }
      case '@called/ALL_CALLED_OPEN_WIM_DENTAL_FAILURE':
        return { ...state, loading: false }
    default:
      return state;
  }
}
