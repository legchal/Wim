export function getLogAcessRequest(start, end){
    return {
        type: '@log/GET_ALL_LOG_REQUEST',
        payload: {start, end},
    }
}

export function getLogAcessSuccess(data){
    return {
        type: '@log/GET_ALL_LOG_SUCCESS',
        payload: data
    }
}

export function getLogAcessFailure(){
    return {
        type: '@log/GET_ALL_LOG_FAILURE'
    }
}

//MONTH - - - - - -- 
export function getLogAcessMonthRequest(start, end, value){
    return {
        type: '@log/GET_Month_LOG_REQUEST',
        payload: {start, end, value},
    }
}

export function getLogAcessMonthSuccess(data){
    return {
        type: '@log/GET_Month_LOG_SUCCESS',
        payload: data
    }
}

export function getLogAcessMonthFailure(){
    return {
        type: '@log/GET_Month_LOG_FAILURE'
    }
}
//DAY - - - - - -
export function getLogAcessDayRequest(start, end, value){
    return {
        type: '@log/GET_DAY_LOG_REQUEST',
        payload: {start, end, value},
    }
}

export function getLogAcessDaySuccess(data){
    return {
        type: '@log/GET_DAY_LOG_SUCCESS',
        payload: data
    }
}

export function getLogAcessDayFailure(){
    return {
        type: '@log/GET_DAY_LOG_FAILURE'
    }
}

// REGISTER LOGS

export function getRegisterLogRequest(start, end, value){
    return {
        type: '@log/GET_REGISTER_LOG_REQUEST',
        payload: {start, end, value},
    }
}

export function getRegisterLogSuccess(data){
    return {
        type: '@log/GET_REGISTER_LOG_SUCCESS',
        payload: { data }
    }
}

export function getRegisterLogFailure(){
    return {
        type: '@log/GET_REGISTER_LOG_FAILURE'
    }
}
