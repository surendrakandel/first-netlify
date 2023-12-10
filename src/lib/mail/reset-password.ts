
// import type Mail from "nodemailer/lib/mailer";

export function getResetPasswordEmailTemplate(sender:string, to:string, redirectURL:string) {
    // let resetPassword:Mail.Options = {
    // sender: sender,
    // to: to,
    // subject: "Your Reset Password Link",
    // html: `<!DOCTYPE html>
    //         <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">

    //         <head>
    //             <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    //             <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    //             <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //             <meta name="format-detection" content="date=no">
    //             <meta name="format-detection" content="address=no">
    //             <meta name="format-detection" content="telephone=no">
    //             <meta name="x-apple-disable-message-reformatting">
    //             <!--[if !mso]><!-->
    //             <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i,900,900i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">
    //             <style>
    //                 @media only screen and (max-device-width: 480px),
    //                 only screen and (max-width: 480px) {
    //                     .center {
    //                         margin: 0 auto !important;
    //                     }
    //                     .td {
    //                         width: 100% !important;
    //                         min-width: 100% !important;
    //                     }
    //                 }
    //             </style>
    //         </head>

    //         <body style="background: #1d1d1d; -webkit-text-size-adjust: none; word-break: break-word; -webkit-font-smoothing: antialiased; display: block; min-width: 100%; margin: 0; width: 100%; padding: 0">
    //             <div role="article" aria-roledescription="email" aria-label="" lang="en" style="min-width: 400px">
    //                 <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; color: #1B2752" cellpadding="0" cellspacing="0" role="presentation">
    //                     <tr style="width: 100%; background-color: #1B2752">
    //                         <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#1b2752" style="padding: 20px 0px" role="presentation">
    //                             <tbody style="margin: auto; text-align: center; width: 100%">
    //                                 <tr style="height: 60px">
    //                                     <td>
    //                                         <a href="https://firstshipper.com" referrerpolicy="origin" aria-label="go to firstshipper home page" target="_blank" style="color: #ffffff; text-decoration: none">
    //                                             <img src="https://firstshipper.com/images/logo/white_logo.png" height="50px" width="150px" style="-ms-interpolation-mode: bicubic" alt="">
    //                                         </a>
    //                                     </td>
    //                                 </tr>
    //                             </tbody>
    //                         </table>
    //                     </tr>
    //                     <tr>
    //                     </tr>
    //                     <tr style="text-align: center; width: 100%">
    //                         <td class="td" bgcolor="#ffffff" align="center">
    //                             <div style="width: 100%; background-color: #f4f4f4; padding-top: 48px; padding-bottom: 48px">
    //                                 <table border="0" cellspacing="0" cellpadding="0" style="
    //                 max-width: 750px; padding: 55px 30px; background: #f4f4f4; border: 20px solid #5cb971; width: 100%" align="center" role="presentation">
    //                                     <tbody>
    //                                         <tr>
    //                                             <td class="center" style="
    //                         color: #1b2752; font-family: 'Playfair Display', Georgia, serif; font-size: 16px; line-height: 30px; text-transform: uppercase; text-align: center; padding-bottom: 20px;font-weight: bold;">
    //                                                 <multiline>{USERNAME} Sorry to hear, you forgot your password.</multiline>
    //                                             </td>
    //                                         </tr>
    //                                         <tr>
    //                                             <td class="center" style="
    //                         color: #1b2752; font-family: 'Raleway', Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: center; padding-bottom: 30px">
    //                                                 <multiline>
    //                                                     Please click on below link to reset you password.
    //                                                 </multiline>
    //                                             </td>
    //                                         </tr>
    //                                         <tr>
    //                                             <td class="center" style="
    //                         color: #1b2752; font-family: 'Raleway', Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: center; padding-bottom: 30px">
    //                                                 <multiline>
    //                                                     You can also copy and paste below url to address bar in your browser.
    //                                                 </multiline>
    //                                             </td>
    //                                         </tr>
    //                                         <tr>
    //                                             <td align="center">
    //                                                 <table width="300" border="0" cellspacing="0" cellpadding="0" role="presentation">
    //                                                     <tbody>
    //                                                         <tr>
    //                                                             <td style="font-family: 'Raleway', Arial, sans-serif; font-size: 12px; line-height: 16px; text-align: center; text-transform: uppercase; border: 2px solid #ffffff; padding: 12px 20px; background: #5cb971; color: #ffffff; font-weight: 700">
    //                                                                 <multiline><a href="${redirectURL}" target="_blank" style="color: #ffffff; text-decoration: none"><span style="color: #fff; text-decoration: none">Reset Password</span></a></multiline>
    //                                                             </td>
    //                                                         </tr>
    //                                                     </tbody>
    //                                                 </table>
    //                                             </td>
    //                                         </tr>
    //                                     </tbody>
    //                                 </table>
    //                             </div>
    //                         </td>
    //                     </tr>
    //                 </table>
    //             </div>
    //         </body>
    //     </html>`}
    // return resetPassword;
}