export function getUpdateSystemRequest(start, end, value){
    return {
        type: '@log/GET_UPDATE_SYSTEM_REQUEST',
        payload: {start, end, value},
    }
}