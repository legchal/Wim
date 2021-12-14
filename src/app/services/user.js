import {AppConfig} from '../config/base'
import { resolve } from 'q';
import api from './axios';
const useCors = true;


export function login (credential, forceJson = false){
    return new Promise((resolve,reject)=>{
        fetch(AppConfig.baseApiUrl('session'), {
            method: 'POST',
            cache: 'no-cache',
            mode: 'cors',
            body: typeof credential === "string" || forceJson ? credential : JSON.stringify({...credential,app:"admin"}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response)=>{
            response.json().then((data) => resolve(data));
        }).catch((erro)=>{
            erro.json().then((data) => reject(data));
        })
    })
}

export async function getUserIdAdminFromClinic(id){
    try{
        const {data} = await api.get(`/clinic-user-admin/${id}`);

        return data.superId;

    }catch(err){
        console.log(err)
    }
}