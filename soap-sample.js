const SoapClient = require('./lib/soap');


const soapClient = new SoapClient('username', 'password');

soapClient.GetCredit().then(res => console.log(res));
// soapClient.GetOutBoxCount().then(res => console.log(res));
// soapClient.SendSimpleSMS2('09123456789', '5000xxx', 'test sms', false)
//     .then(res => console.log(res));