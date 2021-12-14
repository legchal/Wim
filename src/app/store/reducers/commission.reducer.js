const INITIAL_STATE = {
    allSales: [],
    loading: false,
    allSalesmans: [],
    SalesmanSales: [],
  }
  
  export default function comission(state = INITIAL_STATE, action) {
    switch (action.type) {
      case '@commission/GET_ALL_REQUEST':
        return { ...state, loading: true };
      case '@commission/GET_ALL_SUCCESS':
        return { ...state, allSales: action.payload, loading: false }
      case '@commission/GET_ALL_FAILURE':
        return { ...state, loading: false };      
      case '@commission/GET_ALL_SALESMANS_REQUEST':
        return { ...state, loading: true };
      case '@commission/GET_ALL_SALESMANS_SUCCESS':
        return { ...state, allSalesmans: action.payload, loading: false }
      case '@commission/GET_ALL_SALESMANS_FAILURE':
        return { ...state, loading: false }; 
      case '@commission/GET_ALL_SALESMAN_SALES_REQUEST':
        return { ...state, loading: true };
      case '@commission/GET_ALL_SALESMAN_SALES_SUCCESS':
        return { ...state, SalesmanSales: action.payload, loading: false }
      case '@commission/GET_ALL_SALESMAN_SALES_FAILURE':
        return { ...state, loading: false }; 
        default:
        return state;
    }
  }
  