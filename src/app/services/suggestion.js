import api from './axios';
import { toast } from 'react-toastify';


export async function getSuggestions(){
  try{
    const data = await api.get('/suggestions');
    
    return data;
  }catch(err){
    console.log(err)
  }
}

export async function setRead(id){
  try{
    const data = await api.put(`/suggestions/${id}`);
  

    toast.success('Sugestão Lida com sucesso!');
    return data;
  }catch(err){
    console.log(err)
  }
}

export async function getSuggestionsFromDates(start,end){
  try{
    
    const data = await api.get(`/suggestions-from-date/${start}/${end}`)

    return data;
  }catch(err){
     console.log(err)
  }
}


