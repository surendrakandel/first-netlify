
import { fail } from "@sveltejs/kit";
// import { generatePasswordResetToken } from "$lib/auth/token";
import { isValidEmail, sendResetPasswordLink } from '$src/lib/mail/mailConfig';
import type { Actions } from "./$types";
import { eq } from "drizzle-orm";
import { users } from "$src/lib/db/schemas/user";
import { clerkClient } from "$src/lib/auth";
export const prerender = false;
export const actions: Actions = {
  default: async ({ request,locals }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    if (!isValidEmail(email)) {
      return fail(400, {
        message: "Invalid email"
      });
    }
    try {
      let email = await clerkClient.emails.createEmail({
        fromEmailName: "firstshipper ",
        emailAddressId:"rakeshneupane2045@gmail.com",
        subject:"reset your password",
        body: "<h1>Heelo</h1>",
      })

      //@ts-ignore
      const user = auth.transformDatabaseUser(storedUser);
      // const token = await generatePasswordResetToken(user.userId);
      // await sendResetPasswordLink(email, "token");
      return {
        success: true
      };
    } catch (e) {
      return fail(500, {
        message: "An unknown error occurred"
      });
    }
  }
};