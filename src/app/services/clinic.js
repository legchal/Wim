import api from './axios';

export async function lastCanceledRecurrency(id){
  try{
    const {data} = await api.get(`/get-last-canceled-recurrence/${id}`)
    
    return data.lastRecurrency[0];
  }catch(err){
    console.log(err)
  }
}
export async function getClinicFromUserId(id){
  try{
    const {data} = await api.get(`/get-clinic-called/${id}`)

    return data;
  }catch(err){
    console.log(err)
  }
}