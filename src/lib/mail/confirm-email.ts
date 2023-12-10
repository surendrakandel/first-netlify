

export function getConfrimEmailTemplate(sender:string, to:string, redirectUrl:string) {
    // let confirmEmail:Mail.Options = {
    // sender: sender,
    // to: to,
    // subject: "Please Confirm your email",
    // html: `<!DOCTYPE html>
    // <html lang="en"
    //       xmlns:v="urn:schemas-microsoft-com:vml">
    
    // <head>
    //     <meta http-equiv="Content-type"
    //           content="text/html; charset=utf-8">
    //     <meta name="viewport"
    //           content="width=device-width, initial-scale=1, maximum-scale=1">
    //     <meta http-equiv="X-UA-Compatible"
    //           content="IE=edge">
    //     <meta name="format-detection"
    //           content="date=no">
    //     <meta name="format-detection"
    //           content="address=no">
    //     <meta name="format-detection"
    //           content="telephone=no">
    //     <meta name="x-apple-disable-message-reformatting">
    //     <!--[if !mso]><!-->
    //     <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i,900,900i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i"
    //           rel="stylesheet">
    //     <style>
    //         @media only screen and (max-device-width: 480px),
    //         only screen and (max-width: 480px) {
    //             .center {
    //                 margin: 0 auto !important;
    //             }
    
    //             .td {
    //                 width: 100% !important;
    //                 min-width: 100% !important;
    //             }
    
    //             .h2 {
    //                 font-size: 44px !important;
    //                 line-height: 48px !important;
    //             }
    //         }
    //     </style>
    // </head>
    
    // <body
    //       style="background: #1d1d1d; -webkit-text-size-adjust: none; word-break: break-word; -webkit-font-smoothing: antialiased; display: block; min-width: 100%; margin: 0; width: 100%; padding: 0">
    //     <div role="article"
    //          aria-roledescription="email"
    //          aria-label=""
    //          lang="en"
    //          style="min-width: 400px">
    
    //         <div style="min-width: 400px"
    //              lang="en"
    //              aria-label=""
    //              aria-roledescription="email"
    //              role="article">
    //             <table role="presentation"
    //                    cellspacing="0"
    //                    cellpadding="0"
    //                    style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; color: #1B2752">
    //                 <tbody>
    //                     <tr style="width: 100%; background-color: #1B2752">
    //                     </tr>
    //                 </tbody>
    //             </table>
    //             <table role="presentation"
    //                    style="padding: 20px 0px"
    //                    bgcolor="#1b2752"
    //                    cellpadding="0"
    //                    cellspacing="0"
    //                    border="0"
    //                    width="100%">
    //                 <tbody style="margin: auto; text-align: center; width: 100%">
    //                     <tr style="height: 60px">
    //                         <td>
    //                             <a style="color: #ffffff; text-decoration: none"
    //                                aria-label="go to firstshipper home page"
    //                                href="https://firstshipper.com">
    //                                 <img alt=""
    //                                      style="-ms-interpolation-mode: bicubic"
    //                                      width="150px"
    //                                      height="50px"
    //                                      src="https://firstshipper.com/images/logo/white_logo.png">
    //                             </a>
    //                         </td>
    //                     </tr>
    //                 </tbody>
    //             </table>
    //             <div
    //                  style="width: 100%; background-color: #f4f4f4; padding-top: 48px; padding-bottom: 48px">
    //                 <table role="presentation"
    //                        align="center"
    //                        style="max-width: 750px; padding: 55px 30px; background: #f4f4f4; border: 20px solid #5cb971; width: 100%"
    //                        cellpadding="0"
    //                        cellspacing="0"
    //                        border="0">
    //                     <tbody>
    //                         <tr>
    //                             <td style="color: #1b2752; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; line-height: 30px; text-align: center; padding-bottom: 20px"
    //                                 class="center">
    
    //                                 <p style="font-weight: bold; padding: 0; margin: 0">Hi</p>
    //                                 <p style="padding: 0; margin: 0">Thank you for Signing Up
    //                                     with us.</p>
    
    //                             </td>
    //                         </tr>
    //                         <tr>
    //                             <td style="color: #1b2752; font-family: 'Playfair Display', Georgia, serif; font-size: 30px; line-height: 54px; font-weight: bold; text-transform: uppercase; text-align: center; padding-bottom: 20px"
    //                                 class="h2 center">
    
    //                                 <p style="padding: 0; margin: 0">Start Saving on LTL
    //                                     shipping</p>
    
    //                             </td>
    //                         </tr>
    //                         <tr>
    //                             <td style="color: #1b2752; font-family: 'Raleway', Arial, sans-serif; font-size: 20px; line-height: 24px; text-align: center; padding-bottom: 30px"
    //                                 class="center">
    
    //                                 This link will be available until next 24 hours. If you
    //                                 did not confirm your email by that time. Please Signup
    //                                 again.
    
    
    //                                 Please click on below link to confirm your email.
    
    //                             </td>
    //                         </tr>
    //                         <tr>
    //                             <td align="center">
    //                                 <table role="presentation"
    //                                        cellpadding="0"
    //                                        cellspacing="0"
    //                                        border="0"
    //                                        width="300">
    //                                     <tbody>
    //                                         <tr>
    //                                             <td
    //                                                 style="font-family: 'Raleway', Arial, sans-serif; font-size: 12px; line-height: 16px; text-align: center; text-transform: uppercase; border: 2px solid #ffffff; padding: 12px 20px; background: #5cb971; color: #ffffff; font-weight: 700">
    //                                                 <a style="color: #ffffff; text-decoration: none"
    //                                                    href=${redirectUrl}><span
    //                                                           style="color: #fff; text-decoration: none; min-width: 300px">Confirm
    //                                                         Email</span></a>
    //                                             </td>
    //                                         </tr>
    //                                     </tbody>
    //                                 </table>
    //                             </td>
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //     </div>
    // </body>
    // </html>`,
    //     };
    // return confirmEmail;
}