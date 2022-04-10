
let message = 'err';

let send = (message) =>{
    if (message == 'err'){
        console.log('coooollllll');
        send(message);
    }
};


send('err');