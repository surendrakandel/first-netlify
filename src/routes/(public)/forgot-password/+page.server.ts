// routes/password-reset/+page.server.ts

import { fail } from "@sveltejs/kit";
// import { generatePasswordResetToken } from "$lib/auth/token";

import type { Actions } from "./$types";
import { isValidEmail } from "$src/lib/mail/mailConfig";
import { clerkClient } from "$src/lib/auth";
export const prerender = false;
export const actions: Actions = {
    default: async ({ request,platform, locals }) => {
        console.log("in send    paswrod reset link")
        try {
            const formData = await request.formData();
            const emailAddress = formData.get("email");
            console.log("email is ",emailAddress)
            if (!isValidEmail(emailAddress)) {
            return fail(400, {
                message: "Invalid email"
            });
            }
            await clerkClient.emails.createEmail({
                fromEmailName: "firstshipper",
                emailAddressId:"rakeshneupane2045@gmail.com",
                subject:"reset your password",
                body: "hello",
            })
            console.log("email is ")
        //@ts-ignore
        const user = auth.transformDatabaseUser(storedUser);
        // const token = await generatePasswordResetToken(user.userId);
        // await sendResetPasswordLink(email, token);
        return {
            success: true
        };
        } catch (e) {
            console.log("error is ",e)
            return fail(500, {
            message: "An unknown error occurred"
            });
        }
    }
};