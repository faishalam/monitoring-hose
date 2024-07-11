const nodemailer = require('nodemailer')

async function sendEmail(emails, selang) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "faishalabdulmajid@gmail.com",
            pass: "iedk blxq tmjg hhiy"
        }
    })

    console.log(emails)
    const text = `
        REMINDER PENGANTIAN
        Unit: ${selang.unit}
        Component: ${selang.component}
        PN: ${selang.pn}
        HM Penggantian: ${selang.hmPenggantian}
        Quantity: ${selang.quantity}
        Lifetime: ${selang.lifetime}
        Target: ${selang.target}
        Remark: ${selang.remark}
    `;

    const recipients = emails.join(',');

    const sendMail = transporter.sendMail({
        from: "noreply",
        to: recipients,
        subject: "testing ya",
        text: text
    })
    console.log("email berhasil dikirim")
}


module.exports = {
    sendEmail
}