
import { getConfrimEmailTemplate } from "./confirm-email";
import { getResetPasswordEmailTemplate } from "./reset-password";
import { getWelcomeEmailTemplate } from "./welcome";

// export const transporter = nodemailer.createTransport({
//   host: "smtppro.zoho.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "noreply@firstshipper.com",
//     pass: "Ferina@11234",
//   },
// });
//@ts-ignore
import { PUBLIC_ENV, PUBLIC_DEV_PORT} from '$env/static/public';
// lib/server/email.ts
export const isValidEmail = (maybeEmail: unknown): maybeEmail is string => {
	if (typeof maybeEmail !== 'string') return false;
	if (maybeEmail.length > 255) return false;
	const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
	return emailRegexp.test(maybeEmail);
};



export async function sendEmailVerificationLink(to:string, token:string) {
    let url = "";
	PUBLIC_ENV == "DEV" ? url = `http://127.0.0.1:${PUBLIC_DEV_PORT}/email-verification/${token}` : url = `https://www.firstshipper.com/email-verification/${token}`;
	console.log('sending email verification link to', to, 'with url', url);
    // let confirmEmailOption: Mail.Options = getConfrimEmailTemplate("noreply@firstshipper.com", to, token)
    // return transporter.sendMail(confirmEmailOption);
};
export async function sendResetPasswordLink(to:string, token:string) {
    let url = "";
	PUBLIC_ENV == "DEV" ? url = `http://127.0.0.1:${PUBLIC_DEV_PORT}/password-reset/${token}` : url = `https://www.firstshipper.com/email-verification/${token}`;
	console.log('sending password reset link to', to, 'with url', url);
    // let passwordRestTemp: Mail.Options = getResetPasswordEmailTemplate("noreply@firstshipper.com", to, token)
    // return transporter.sendMail(passwordRestTemp);
};
export function sendWelcomEmail(to:string) {
    // let wecomeEmailTemp: Mail.Options = getWelcomeEmailTemplate("noreply@firstshipper.com", to)
    // return transporter.sendMail(wecomeEmailTemp);
};