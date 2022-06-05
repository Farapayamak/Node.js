const https = require('https');

const data = JSON.stringify({
    'from': '5000xxx',
    'to': '09123456789',
    'text': 'test sms'
});

const options = {
    hostname: 'rest.payamak-panel.com/api/SendSMS/SendSMS',
    port: 443,
    path: '/api/SendSMS/SendSMS',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, res => {
    console.log('statusCode: ' + res.statusCode);

    res.on('data', d => {
        process.stdout.write(d)
    });
});

req.on('error', error => {
    console.error(error);
});

req.write(data);
req.end();