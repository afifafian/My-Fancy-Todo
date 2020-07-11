const mailgun = require("mailgun-js");
var api_key = process.env.APIMAILGUN;
const DOMAIN = process.env.DOMAINMAILGUN;
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

async function sendEmail(receiver,subject,text) {
    const data = {
        from: 'Fancy Todo App Team <afifafian@gmail.com>',
        to: `${receiver}`,
        subject: subject,
        text: text
    };
    await mg.messages().send(data, function (error, body) {
        if (error) {
            throw error
        } else {
            console.log(body)
        }
    });
}


module.exports = sendEmail

// usage:
