import api from './axios';

export async function createUpdateSystem(data){
    console.log(data);
    try {
        const newUpdate = await api.post('/system-update-create', data);
        return newUpdate;
    } catch (error) {
        console.log(error);
    }
}

export async function updateSystem(){
    try {
        const count = await api.get(`/system-update`);
        return count.data;
    } catch (error) {
        console.log(error);
    }
}

