const SoapClient = require('./lib/soap');


const soapClient = new SoapClient('username', 'password');

soapClient.GetCredit().then(res => console.log(res));