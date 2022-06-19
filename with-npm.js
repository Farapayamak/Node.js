const SoapClient = require('farapayamak/lib/soap');
const RestClient = require('farapayamak/lib/rest');

const soapClient = new SoapClient('username', 'password');

soapClient.GetCredit().then(res => console.log(res));
