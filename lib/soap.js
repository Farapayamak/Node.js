var soap = require('soap');


class SoapClient {

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    request(endpoint, method, params, returnResult = true) {
        
        params['username'] = this.username;
        params['password'] = this.password;

        return new Promise((resolve, reject) => {
            soap.createClientAsync(`http://api.payamak-panel.com/post/${endpoint}.asmx?wsdl`)
            .then(client => client[method](params))
            .then(result => 
                returnResult ? resolve(result[0][method + 'Result']) : resolve(result[0]))
            .catch(err => reject(err));
        })
    }

    GetCredit = () => this.request(ENDPOINTS.SEND, 'GetCredit', {});
}


class ENDPOINTS {
    static SEND = "Send";

}