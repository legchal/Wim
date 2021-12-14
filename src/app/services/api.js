import {AppConfig} from '../config/base'
const useCors = true;
/**
 * Perform a GET with JWT
 * @param {*} endPoint
 * @param {*} headers
 */
 export function httpGet (endPoint, headers = {}, _useCors = true) {
     return fetch(AppConfig.baseApiUrl(endPoint), {
         method: 'GET',
         cache: 'no-cache',
         mode: useCors && _useCors ? 'cors' : 'no-cors',
         headers: {
             'Authorization': 'Bearer ' + localStorage.getItem('@token'),
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             ...headers
         }
     });
 }

 /**
  * Perform a POST with JWT
  * @param {*String} endPoint
  * @param {*Object | String} body
  * @param {*Object} headers
  */
 export function httpPost (endPoint, body, headers = {}, forceJson = false) {
     return fetch(AppConfig.baseApiUrl(endPoint), {
         method: 'POST',
         cache: 'no-cache',
         mode: useCors ? 'cors' : 'no-cors',
         body: typeof body === "string" || forceJson ? body : JSON.stringify(body),
         headers: {
             'Authorization': 'Bearer ' + localStorage.getItem('@token'),
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             ...headers
         }
     });
 }
