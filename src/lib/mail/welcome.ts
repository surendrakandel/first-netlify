
// import type Mail from "nodemailer/lib/mailer";

export function getWelcomeEmailTemplate(sender:string, to:string) {
    // let resetPassword:Mail.Options = {
    // sender: sender,
    // to: to,
    // subject: "Your Reset Password Link",
    // html: `<!DOCTYPE html>
    // <html lang="en"
    //       xmlns:v="urn:schemas-microsoft-com:vml">
    
    // <head>
    //   <meta http-equiv="Content-type"
    //         content="text/html; charset=utf-8">
    //   <meta name="viewport"
    //         content="width=device-width, initial-scale=1, maximum-scale=1">
    //   <meta http-equiv="X-UA-Compatible"
    //         content="IE=edge">
    //   <meta name="format-detection"
    //         content="date=no">
    //   <meta name="format-detection"
    //         content="address=no">
    //   <meta name="format-detection"
    //         content="telephone=no">
    //   <meta name="x-apple-disable-message-reformatting">
    //   <!--[if !mso]><!-->
    //   <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i,900,900i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i"
    //         rel="stylesheet">
    //   <style>
    //     @media only screen and (max-device-width: 480px),
    //     only screen and (max-width: 480px) {
    //       .center {
    //         margin: 0 auto !important;
    //       }
    
    //       .td {
    //         width: 100% !important;
    //         min-width: 100% !important;
    //       }
    
    //       .h2 {
    //         font-size: 44px !important;
    //         line-height: 48px !important;
    //       }
    //     }
    //   </style>
    // </head>
    
    // <body
    //       style="background: #1d1d1d; -webkit-text-size-adjust: none; word-break: break-word; -webkit-font-smoothing: antialiased; display: block; min-width: 100%; margin: 0; width: 100%; padding: 0">
    //   <div role="article"
    //        aria-roledescription="email"
    //        aria-label=""
    //        lang="en"
    //        style="min-width: 400px">
    //     <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; color: #1B2752"
    //            cellpadding="0"
    //            cellspacing="0"
    //            role="presentation">
    //       <tr style="width: 100%; background-color: #1B2752">
    //         <table width="100%"
    //                border="0"
    //                cellspacing="0"
    //                cellpadding="0"
    //                bgcolor="#1b2752"
    //                style="padding: 20px 0px"
    //                role="presentation">
    //           <tbody style="margin: auto; text-align: center; width: 100%">
    //             <tr style="height: 60px">
    //               <td>
    //                 <a href="https://firstshipper.com"
    //                    referrerpolicy="origin"
    //                    aria-label="go to firstshipper home page"
    //                    target="_blank"
    //                    style="color: #ffffff; text-decoration: none">
    //                   <img src="https://firstshipper.com/images/logo/white_logo.png"
    //                        height="50px"
    //                        width="150px"
    //                        style="-ms-interpolation-mode: bicubic"
    //                        alt="">
    //                 </a>
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </tr>
    //       <tr>
    //       </tr>
    //       <tr style="text-align: center; width: 100%">
    //         <td class="td"
    //             bgcolor="#ffffff"
    //             align="center">
    //           <div
    //                style="width: 100%; background-color: #f4f4f4; padding-top: 48px; padding-bottom: 48px">
    //             <table border="0"
    //                    cellspacing="0"
    //                    cellpadding="0"
    //                    style="
    //             max-width: 750px; padding: 55px 30px; background: #f4f4f4; border: 20px solid #5cb971; width: 100%"
    //                    align="center"
    //                    role="presentation">
    //               <tbody>
    //                 <tr>
    //                   <td class="center"
    //                       style="
    //                   color: #1b2752; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; line-height: 30px; text-align: center; padding-bottom: 20px">
    //                     <multiline>
    //                       <p style="font-weight: bold; padding: 0; margin: 0">Hi
    //                         {user_first_name} {user_last_name}, </p>
    //                       <p style="padding: 0; margin: 0">Thank you for Signing Up with us.
    //                       </p>
    //                     </multiline>
    //                   </td>
    //                 </tr>
    //                 <tr>
    //                   <td class="h2 center"
    //                       style="
    //                   color: #1b2752; font-family: 'Playfair Display', Georgia, serif; font-size: 30px; line-height: 54px; font-weight: bold; text-transform: uppercase; text-align: center; padding-bottom: 20px">
    //                     <multiline>
    //                       <p style="padding: 0; margin: 0">Welcome to FirstShipper</p>
    //                     </multiline>
    //                   </td>
    //                 </tr>
    //                 <tr>
    //                   <td class="center"
    //                       style="
    //                   color: #1b2752; font-family: 'Raleway', Arial, sans-serif; font-size: 20px; line-height: 24px; text-align: center; padding-bottom: 30px">
    //                     <multiline>
    //                       Please click on below link to login and Enjoy Savings on SHIPPING.
    //                     </multiline>
    //                   </td>
    //                 </tr>
    //                 <tr>
    //                   <td align="center">
    //                     <table width="300"
    //                            border="0"
    //                            cellspacing="0"
    //                            cellpadding="0"
    //                            role="presentation">
    //                       <tbody>
    //                         <tr>
    //                           <td
    //                               style="font-family: 'Raleway', Arial, sans-serif; font-size: 12px; line-height: 16px; text-align: center; text-transform: uppercase; border: 2px solid #ffffff; padding: 12px 20px; background: #5cb971; color: #ffffff; font-weight: 700">
    //                             <multiline><a href="https://firstshipper.com/login"
    //                                  target="_blank"
    //                                  style="color: #ffffff; text-decoration: none"><span
    //                                       style="color: #fff; text-decoration: none; min-width: 300px">Goto
    //                                   Dashboard</span></a></multiline>
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </div>
    //         </td>
    //       </tr>
    //       <tr>
    //         <table width="100%"
    //                border="0"
    //                cellspacing="0"
    //                cellpadding="0"
    //                bgcolor="#1b2752"
    //                style="padding: 30px 0px"
    //                role="presentation">
    //           <tbody style="margin: auto; text-align: center; width: 100%">
    //             <tr style="height: 350px">
    //               <td style="text-align: center">
    //                 <a href="https://firstshipper.com"
    //                    aria-label="first shipper home page"
    //                    target="_blank"
    //                    referrerpolicy="origin"
    //                    style="color: #ffffff; text-decoration: none">
    //                   <img src="https://firstshipper.com/images/banner/banner_img.png"
    //                        width="400px"
    //                        height="300px"
    //                        border="0"
    //                        alt=""
    //                        style="-ms-interpolation-mode: bicubic">
    //                 </a>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td style="text-align: center; height: 70px">
    //                 <p
    //                    style="padding: 0; margin: 20px 0; text-align: center; font-family: ui-monospace, Menlo, Consolas, monospace; text-transform: uppercase; color: #fff">
    //                   Powered by FirstShipper
    //                 </p>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td style="text-align: center; height: 30px">
    //                 <p
    //                    style="padding: 0; margin: 20px 0; text-align: center; font-family: ui-monospace, Menlo, Consolas, monospace; color: #fff">
    //                   Save Big on your Pallets shipping
    //                 </p>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td style="text-align: center; height: 30px">
    //                 <a href="https://firstshipper.com/dashboard/qutoes"
    //                    target="_blank"
    //                    style="text-decoration: none; color: #22c55e; font-family: ui-monospace, Menlo, Consolas, monospace; text-decoration-line: none"
    //                    referrerpolicy="origin">
    //                   Get Quote
    //                 </a>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td style="text-align: center; height: 30px">
    //                 <a href="https://firstshipper.com/track"
    //                    target="_blank"
    //                    style="text-decoration: none; color: #22c55e; font-family: ui-monospace, Menlo, Consolas, monospace; text-decoration-line: none"
    //                    referrerpolicy="origin">
    //                   Track A Shipment
    //                 </a>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td style="text-align: center; height: 30px">
    //                 <a href="https://firstshipper.com/contact"
    //                    target="_blank"
    //                    style="text-decoration: none; color: #22c55e; font-family: ui-monospace, Menlo, Consolas, monospace; text-decoration-line: none"
    //                    referrerpolicy="origin">
    //                   Contact
    //                 </a>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td style="text-align: center; height: 30px">
    //                 <a href="https://firstshipper.com/dashboard"
    //                    target="_blank"
    //                    style="text-decoration: none; color: #22c55e; font-family: ui-monospace, Menlo, Consolas, monospace; text-decoration-line: none"
    //                    referrerpolicy="origin">
    //                   Dashboard
    //                 </a>
    //               </td>
    //             </tr>
    //             <tr style="height: 60px">
    //               <td style="text-align: center; margin: 5px 0; height: 100%">
    //                 <a href="https://firstshipper.com"
    //                    aria-label="first shipper home page"
    //                    target="_blank"
    //                    referrerpolicy="origin"
    //                    style="color: #ffffff; text-decoration: none">
    //                   <img src="https://firstshipper.com/images/logo/white_logo.png"
    //                        width="70"
    //                        height="30"
    //                        border="0"
    //                        alt=""
    //                        style="-ms-interpolation-mode: bicubic">
    //                 </a>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td style="text-align: center">
    //                 <a href="https://firstshipper.com/dashboard"
    //                    target="_blank"
    //                    style="text-decoration: none; color: #22c55e; font-family: ui-monospace, Menlo, Consolas, monospace; text-decoration-line: none"
    //                    referrerpolicy="origin">
    //                   <p
    //                      style="padding: 0; margin: 0; text-align: center; font-family: ui-monospace, Menlo, Consolas, monospace; color: #fff">
    //                     All Right Reserved <span>&#174;</span>FirstShipper
    //                   </p>
    //                 </a>
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </tr>
    //     </table>
    //   </div>
    // </body>
    // </html>`}
    // return resetPassword;
}