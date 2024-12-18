const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');

// transport
const transporter = nodemailer.createTransport(
    mailgunTransport({
        auth:{
            api_key: process.env.API_Mailgun,
        },
    })
);

const sendEmailController = (req, res) => {
    try {
        const {name, email, msg} = req.body

        // validation
        if(!name || !email || !msg) {
            return  res.status(500).send({
                success:false,
                message: 'Please Provide All Fields',
            })
        }

        // email matter
        transporter.sendMail({
            to: 'hwagh864@gmail.com',
            from: 'waghr236@gmail.com',
            subject: 'regarding mer portfolio app',
            html: `
            <h5>Detail Information</h5>
            <ul>
                <li> 
                    <p>Name : ${name}</p>
                </li>
                <li> 
                    <p>Email : ${email}</p>
                </li>
                <li> 
                    <p>Message : ${msg}</p>
                </li>
            </ul>
            `
        })

        return res.status(200).send({
            success: true,
            message: "Your Message Sent Successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Send Email API Error",
            error
        });
    }
};

module.exports = { sendEmailController };