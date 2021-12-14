import io from 'socket.io-client';

let socket = io('http://127.0.0.1:3333');

if(process.env.NODE_ENV === 'production') {
    socket = io('https://api.admin.wimdental.com');
}

export default socket;