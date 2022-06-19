var soap = require('soap');


class SoapClient {

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    request(endpoint, method, params) {

        params['username'] = this.username;
        params['password'] = this.password;

        return new Promise((resolve, reject) => {
            soap.createClientAsync(`http://api.payamak-panel.com/post/${endpoint}.asmx?wsdl`)
                .then(client => client[method + 'Async'](params))
                .then(result => {
                    if (result)
                        resolve(result);
                })
                .catch(err => reject(err));
        });
    }

    // SEND webservice
    GetCredit = () => this.request(ENDPOINTS.SEND, 'GetCredit', {});
    GetDeliveries = (recIds) => this.request(ENDPOINTS.SEND, 'GetDeliveries', { recIds });
    GetDeliveries3 = (recId) => this.request(ENDPOINTS.SEND, 'GetDeliveries3', { recId });
    GetSmsPrice = (irancellCount, mtnCount, from, text) => this.request(ENDPOINTS.SEND, 'GetSmsPrice', { irancellCount, mtnCount, from, text });
    SendByBaseNumber = (text, to, bodyId) => this.request(ENDPOINTS.SEND, 'SendByBaseNumber', { text, to, bodyId });
    SendByBaseNumber2 = (text, to, bodyId) => this.request(ENDPOINTS.SEND, 'SendByBaseNumber2', { text, to, bodyId });
    SendByBaseNumber3 = (text, to) => this.request(ENDPOINTS.SEND, 'SendByBaseNumber3', { 'text': text, 'to': to });
    SendSimpleSMS = (to, from, text, isflash) => this.request(ENDPOINTS.SEND, 'SendSimpleSMS', { to, from, text, isflash });
    SendSimpleSMS2 = (to, from, text, isflash) => this.request(ENDPOINTS.SEND, 'SendSimpleSMS2', { to, from, text, isflash });
    SendSms = (to, from, text, isflash, udh, recId, status) => this.request(ENDPOINTS.SEND, 'SendSms', { to, from, text, isflash, udh, recId, status });
    SendSms2 = (to, from, text, isflash, udh, recId, status, filterId) => this.request(ENDPOINTS.SEND, 'SendSms2', { to, from, text, isflash, udh, recId, status, filterId });
    SendMultipleSMS = (to, from, text, isflash, udh, recId, status) => this.request(ENDPOINTS.SEND, 'SendMultipleSMS', { to, from, text, isflash, udh, recId, status });
    SendMultipleSMS2 = (to, from, text, isflash, udh, recId, status) => this.request(ENDPOINTS.SEND, 'SendMultipleSMS2', { to, from, text, isflash, udh, recId, status });
}


class ENDPOINTS {
    static SEND = "Send";

}

module.exports = SoapClient;