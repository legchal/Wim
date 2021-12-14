const INITIAL_STATE = {
  allFinances: [],
  previsionClinics: [],
  loading: false,
  cashFlow: {},
  getCashFlowEditing: {},
  recipe: 0,
  activesPending: []
}

export default function finance(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@finance/GET_ALL_PAYMENTS_PER_DATE_REQUEST':
      return { ...state, loading: true };
    case '@finance/GET_ALL_PAYMENTS_PER_DATE_SUCCESS':
      return { ...state, allFinances: action.payload.payments, loading: false }
    case '@finance/GET_ALL_PAYMENTS_PER_DATE_FAILURE':
      return { ...state, loading: false };
    case '@finance/PREVISION_NEW_CLINICS_REQUEST':
      return { ...state, loading: true }
    case '@finance/PREVISION_NEW_CLINICS_SUCCESS':
      return { ...state, loading: false, previsionClinics: action.payload.data };
    case '@finance/PREVISION_NEW_CLINICS_FAILURE':
      return { ...state, loading: false };
    case '@finance/NEW_EXPENSE_REQUEST':
      return { ...state, loading: true }
    case '@finance/NEW_EXPENSE_SUCCESS':
      return { ...state, loading: false };
    case '@finance/NEW_EXPENSE_FAILURE':
      return { ...state, loading: false };
    case '@finance/GET_ALL_CASH_FLOW_REQUEST':
      return { ...state, loading: true }
    case '@finance/GET_ALL_CASH_FLOW_SUCCESS':
      return { ...state, loading: false, cashFlow: action.payload.data };
    case '@finance/GET_ALL_CASH_FLOW_FAILURE':
      return { ...state, loading: false };
    case '@finance/GET_CASH_FLOW_EDITING_REQUEST':
      return { ...state, loading: true }
    case '@finance/GET_CASH_FLOW_EDITING_SUCCESS':
      return { ...state, loading: false, getCashFlowEditing: action.payload};
    case '@finance/GET_CASH_FLOW_EDITING_FAILURE':
      return { ...state, loading: false };
    case '@finance/UPDATE_EXPENSE_REQUEST':
      return { ...state, loading: true }
    case '@finance/UPDATE_EXPENSE_SUCCESS':
      return { ...state, loading: false };
    case '@finance/UPDATE_EXPENSE_FAILURE':
      return { ...state, loading: false };
    case '@finance/DELETE_EXPENSE_REQUEST':
      return { ...state, loading: true }
    case '@finance/DELETE_EXPENSE_SUCCESS':
      return { ...state, loading: false };
    case '@finance/DELETE_EXPENSE_FAILURE':
      return { ...state, loading: false };
    case '@finance/GET_RECIPE_REQUEST':
      return { ...state, loading: true }
    case '@finance/GET_RECIPE_SUCCESS':
      return { ...state, loading: false, recipe: action.payload.recipe };
    case '@finance/GET_RECIPE_FAILURE':
      return { ...state, loading: false };
    case '@finance/PAID_EXPENSE_REQUEST':
      return { ...state, loading: true }
    case '@finance/PAID_EXPENSE_SUCCESS':
      return { ...state, loading: false };
    case '@finance/PAID_EXPENSE_FAILURE':
      return { ...state, loading: false };
    case '@finance/ACTIVES_PENDING_REQUEST':
      return { ...state, loading: true }
    case '@finance/ACTIVES_PENDING_SUCCESS':
      return { ...state, loading: false, activesPending: action.payload };
    case '@finance/ACTIVES_PENDING_FAILURE':
      return { ...state, loading: false };
    case '@finance/CLEAR_RECIPE':
      return { ...state, loading: false, recipe: 0 };
    case '@finance/ACTIVES_PENDING':
      return { ...state, loading: false, activesPending: 0 };
    default:
      return state;
  }
}
