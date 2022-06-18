const https = require('https');

class RestClient {

    loggingEnable = false;

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    request(func, json) {

        json['username'] = this.username;
        json['password'] = this.password;

        const data = JSON.stringify(json);

        const options = {
            hostname: 'rest.payamak-panel.com',
            port: 443,
            path: `/api/SendSMS/${func}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        if (this.loggingEnable == true) console.log(`Sending:\n${data}`);

        return new Promise((resolve, reject) => {

            const req = https.request(options, res => {
                var responseString = '';
                if (this.loggingEnable) console.log('statusCode: ' + res.statusCode);
                res.on('data', d => {
                    if (this.loggingEnable) process.stdout.write(d);
                    responseString += d;
                });
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(responseString));
                    } catch (error) {
                        reject(error);
                    }
                });
                res.on('error', e => reject(e.message));
            });

            req.on('error', error => reject(error));
            req.write(data);
            req.end();
        });

    }


    SendSMS(to, from, text, isFlash = false) {
        var json = { 'to': to, 'from': from, 'text': text, 'isFlash': isFlash };
        return this.request(FUNCS.SENDSMS, json);
    }

    GetDeliveries(recId) {
        var json = { 'recID': recId };
        return this.request(FUNCS.GETDELIVERIES, json);
    }

    GetMessages(location, from, index, count) {
        var json = { 'location': location, 'from': from, 'index': index, 'count': count };
        return this.request(FUNCS.GETMESSAGES, json);
    }

    GetCredit = () => this.request(FUNCS.GETCREDIT, {});
    GetBasePrice = () => this.request(FUNCS.GETBASEPRICE, {});
    GetUserNumbers = () => this.request(FUNCS.GETUSERNUMBERS, {});

    BaseServicenumber(text, to, bodyId) {
        var json = { 'text': text, 'to': to, 'bodyId': bodyId };
        return this.request(FUNCS.BASESERVICENUMBER, json);
    }
}


class FUNCS {
    static SENDSMS = "SendSMS";
    static GETDELIVERIES = "GetDeliveries2";
    static GETMESSAGES = "GetMessages";
    static GETCREDIT = "GetCredit";
    static GETBASEPRICE = "GetBasePrice";
    static GETUSERNUMBERS = "GetUserNumbers";
    static BASESERVICENUMBER = "BaseServiceNumber";
}

module.exports = RestClient;