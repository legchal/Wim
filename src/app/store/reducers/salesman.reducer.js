const INITIAL_STATE = {
  allSalesman: [],
  loading: false,
  allSales: [],
  selectedSalesman: null,
  createdSalesman: [],
}

export default function salesman(state = INITIAL_STATE, action) {
  switch(action.type) {
    case '@salesman/GET_ALL_REQUEST':
      return { ...state, loading: true };
    case '@salesman/GET_ALL_SUCCESS':
      return { ...state, allSalesman: action.payload, createdSalesman: [], loading: false }
    case '@salesman/GET_ALL_FAILURE':
      return { ...state, loading: false };
    case '@salesman/CREATE_SALESMAN_REQUEST':
      return { ...state, loading: true };
    case '@salesman/CREATE_SALESMAN_SUCCESS':
      return { ...state, createdSalesman: action.payload, loading:  false };
    case '@salesman/CREATE_SALESMAN_FAILURE':
      return { ...state, loading:  false };
    case '@salesman/GET_ALL_SALES_REQUEST':
      return { ...state, loading: true };
    case '@salesman/GET_ALL_SALES_SUCCESS':
      return { ...state, loading:  false, allSales: action.payload };
    case '@salesman/GET_ALL_SALES_FAILURE':
      return { ...state, loading:  false };
    case '@salesman/GET_SALESMAN_BY_ID_REQUEST':
      return { ...state, loading: true };
    case '@salesman/GET_SALESMAN_BY_ID_SUCCESS':
        return { ...state, loading: false, selectedSalesman: action.payload };
    case '@salesman/GET_SALESMAN_BY_ID_FAILURE':
      return {...state, loading: false};
    default:
      return state;
  }
}
