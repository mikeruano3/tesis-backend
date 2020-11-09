const nodemailer = require('nodemailer')
require('dotenv').config()

// email sender function
sendMail = async function (to, subject, text, html) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_MAILER,
            pass: process.env.PASSWORD_EMAIL
        }
    })
    // Definimos el email
    let mailOptions = {
        from: process.env.EMAIL_MAILER,
        to: to,
        subject: subject,
        text: text,
        html: html
    }
    // Enviamos el email
    return await transporter.sendMail(mailOptions)
}

sendReestablishEmail = async function (token, emailDirection) {
    let emailData = reestablishPasswordHTML(token)
    return await sendMail(emailDirection, emailData.subject, emailData.text, emailData.html)
}

reestablishPasswordHTML = function (token) {
    let subject = 'Restablecer Contraseña'
    let contactUrl = process.env.CONTACT_EMAIL
    let urlToken = process.env.RESET_PASS_SITE_URL + '/' + token
    let text = `Su correo electrónico no soporta HTML, visite el siguiente enlace: ${urlToken}`

    let html =
        `<!doctype html>
        <html lang="en-US">
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Correo de restablecimiento de contraseña</title>
            <meta name="description" content="Correo de restablecimiento de contraseña">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>
        
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                </td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                    Usted ha solicitado restablecer su contraseña
                                                </h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    No podemos simplemente enviarle su nueva contraseña. Hemos generado 
                                                    un link único para ayudarlo. Para restablecer su contraseña, haga click 
                                                    en el siguiente enlace y siga las instrucciones.
                                                </p>
                                                <a href="${urlToken}" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; 
                                                    font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                                    Restablecer Contraseña
                                                </a>
                                                <br/>
                                                <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    O también puede copiar y pegar el siguiente enlace en su 
                                                    navegador:
                                                </p>
                                                <p style="color:#455056; font-size:14px; margin:0;">
                                                    ${urlToken}
                                                </p>
                                                <br/>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"> 
                                                    Si usted no solicitó cambio de contraseña, contáctenos en el siguiente correo: ${contactUrl}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>
    </html>`;

    return {
        subject: subject,
        text: text,
        html: html
    }
}

module.exports = {
    sendMail,
    sendReestablishEmail
}