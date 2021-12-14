import api from './axios';

export async function getEmail(email){
  try{
    const getEmail = await api.post('/forgot-password',{
      email,
    })

    return getEmail;
  }catch(error){
    console.log(error);
  }
}
export async function resetPassword(password, token){
  try{
    const reset = await api.put('/reset-password',{
      password,
      token: token.token,
    })

    return reset;
  }catch(error){
    console.log(error);
  }
}