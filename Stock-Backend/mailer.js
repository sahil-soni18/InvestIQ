import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.REACT_MAIL_USER,
        pass: process.env.REACT_MAIL_PASSWORD
    }
});

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: 'Stock Market Alerts <noreply@InvestIQ.com>',
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};

export default sendMail;