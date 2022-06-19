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

    GetCredit = () => this.request(ENDPOINTS.SEND, 'GetCredit', {});
}


class ENDPOINTS {
    static SEND = "Send";

}

module.exports = SoapClient;