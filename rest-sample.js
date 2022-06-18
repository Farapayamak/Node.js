
const RestClient = require('./lib/rest');


const restClient = new RestClient('username', 'password');

restClient.SendSMS('09123456789', '5000xxx', 'test sms', false)
    .then(res => console.log(res.Value));
    
restClient.GetCredit().then(res => console.log(res.Value));
restClient.GetBasePrice().then(res => console.log(res.Value));