import api from './axios';

export async function generateNewTickets(date){
    try {
        const newTickets = await api.post('/generate-tickets', { date });
        return newTickets;
    } catch (error) {
        console.log(error);
    }
}

export async function setTicketRead(id){
    try {
        const read = await api.put(`/set-ticket-read/${id}`);

        return read;
    } catch (error) {
        console.log(error);
    }
}


export async function areThereTicket(){
    try {
        const count = await api.get(`/are-there-ticket`);
        return count.data;
    } catch (error) {
        console.log(error);
    }
}