const INITIAL_STATE = {
    logAccess: [],
    logAccessMonth: [],
    logAccessDay: [],
    registerLogs: [],
    loading: false,
}

export default function log(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@log/GET_ALL_LOG_REQUEST':
            return {...state, loading: true}

        case '@log/GET_ALL_LOG_SUCCESS' :
            return {...state, logAccess: action.payload, loading: false}

        case '@log/GET_ALL_LOG_FAILURE':
            return {...state, loading: false}
            
        case '@log/GET_Month_LOG_REQUEST':
            return {...state, loading: true}

        case '@log/GET_Month_LOG_SUCCESS' :
            return {...state, logAccessMonth: action.payload, loading: false}

        case '@log/GET_Month_LOG_FAILURE':
            return {...state, loading: false}

        case '@log/GET_DAY_LOG_REQUEST':
            return {...state, loading: true}

        case '@log/GET_DAY_LOG_SUCCESS' :
            return {...state, logAccessDay: action.payload, loading: false}

        case '@log/GET_DAY_LOG_FAILURE':
            return {...state, loading: false}
        
        case '@log/GET_REGISTER_LOG_REQUEST':
            return {...state, loading: true}
        
        case '@log/GET_REGISTER_LOG_SUCCESS' :
            return {...state, registerLogs: action.payload, loading: false}
    
        case '@log/GET_REGISTER_LOG_FAILURE':
            return {...state, loading: false}
        default:
            return state;
    }
}