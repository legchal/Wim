const INITIAL_STATE = {
  allClinics: [],
  loading: false,
  allClinicsInactive: [],
  allStates: [],
  realActives: [],
  clinicWim: {},
  clinicUpdate: {},
  usersFromClinic: [],
  verification: '',
  releaseAccess: '',
  deletedRecurrency: {},
  subscriptions: [],
  updateEndPaidSubscription: [],
  subscriptions_clinics: [],
  updateSubscriptions: [],
  changeCard: [],
}

export default function clinics(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@clinics/GET_ALL_STATES_REQUEST':
      return { ...state, loading: true };
    case '@clinics/GET_ALL_STATES_SUCCESS':
      return { ...state, 
        allStates: action.payload.allClinicsAndInterval, 
        allClinics: action.payload.clinicsActives,
        allClinicsInactive: action.payload.clinicsInactives,
        realActives: action.payload.realActives,
        loading: false }
    case '@clinics/GET_ALL_STATES_FAILURE':
      return { ...state, loading: false };
    case '@clinics/GET_CLINIC_WIM_REQUEST':
      return { ...state, loading: true };
    case '@clinics/GET_CLINIC_WIM_SUCCESS':
      return { ...state, clinicWim: action.payload, loading: false }
    case '@clinics/GET_CLINIC_WIM_FAILURE':
      return { ...state, loading: false };
    case '@clinics/GET_USERS_CLINIC_REQUEST':
      return { ...state, loading: true };
    case '@clinics/GET_USERS_CLINIC_SUCCESS':
      return { ...state, usersFromClinic: action.payload, loading: false }
    case '@clinics/GET_USERS_CLINIC_FAILURE':
      return { ...state, loading: false };
    case '@clinics/UPDATE_CLINIC_WIM_REQUEST':
      return { ...state, loading: true };
    case '@clinics/UPDATE_CLINIC_WIM_SUCCESS':
      return { ...state, clinicUpdate: action.payload, loading: false }
    case '@clinics/UPDATE_CLINIC_WIM_FAILURE':
      return { ...state, loading: false };
    case '@clinics/DESTROY_CLINIC_REQUEST':
      return { ...state, loading: true };
    case '@clinics/DESTROY_CLINIC_SUCCESS':
      return { ...state, loading: false }
    case '@clinics/DESTROY_CLINIC_FAILURE':
      return { ...state, loading: false };
    case '@clinics/VERIFY_PASSWORD_REQUEST':
      return { ...state, loading: true };
    case '@clinics/VERIFY_PASSWORD_SUCCESS':
      return { ...state, verification: action.payload, loading: false }
    case '@clinics/VERIFY_PASSWORD_FAILURE':
      return { ...state, loading: false };
    case '@clinics/CLEAR_VERIFY':
      return { ...state, verification: '', loading: false };
    case '@clinics/RELEASE_ACCESS_REQUEST':
      return { ...state, loading: true };
    case '@clinics/RELEASE_ACCESS_SUCCESS':
      return { ...state, releaseAccess: action.payload, loading: false }
    case '@clinics/RELEASE_ACCESS_FAILURE':
      return { ...state, loading: false };
    case '@clinics/GET_PAID_SUBSCRIPTIONS_REQUEST':
      return { ...state, loading: true };
    case '@clinics/GET_PAID_SUBSCRIPTIONS_SUCCESS':
      return { ...state, subscriptions: action.payload, loading: false};
    case '@clinics/GET_PAID_SUBSCRIPTIONS_FAILURE':
      return { ...state, loading: false};
    case '@clinics/UPDATE_END_PAID_SUBSCRIPTIONS_REQUEST':
      return { ...state, loading: true};
    case '@clinics/UPDATE_END_PAID_SUBSCRIPTIONS_SUCCESS':
      return { ...state, updateEndPaidSubscription: action.payload, loading: false};
    case '@clinics/UPDATE_END_PAID_SUBSCRIPTIONS_FAILURE':
      return { ...state, loading: false};
    case '@clinics/GET_SUBSCRIPTIONS_REQUEST':
      return { ...state, loading: true};
    case '@clinics/GET_SUBSCRIPTIONS_SUCCESS':
      return { ...state, subscriptions_clinics: action.payload, loading: false};
    case '@clinics/GET_SUBSCRIPTIONS_FAILURE':
      return { ...state, loading: false};
    case '@clinics/UPDATE_SUBSCRIPTIONS_REQUEST':
      return { ...state, loading: true};
    case '@clinics/UPDATE_SUBSCRIPTIONS_SUCCESS':
      return { ...state, updateSubscription: action.payload, loading: false};
    case '@clinics/UPDATE_SUBSCRIPTIONS_FAILURE':
      return { ...state, loading: false};
    case '@clinics/RESET_UPDATE_SUBSCRIPTIONS':
      return { ...state, updateSubscription: [], loading: false}
    case '@clinics/DELETE_RECURRENCY_REQUEST':
      return { ...state, loading: true};
    case '@clinics/DELETE_RECURRENCY_SUCCESS':
      return { ...state, deletedRecurrency: action.payload, loading: false};
    case '@clinics/DELETE_RECURRENCY_FAILURE':
      return { ...state, loading: false};
    case '@clinics/CHANGE_CARD_REQUEST':
      return { ...state, loading: true};
    case '@clinics/CHANGE_CARD_SUCCESS':
      return { ...state, changeCard: action.payload, loading: false};
    case '@clinics/CHANGE_CARD_FAILURE':
      return { ...state, loading: false};
    default:
      return state;
  }
}
