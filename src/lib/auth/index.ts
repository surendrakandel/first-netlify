import { PRIVATE_CLERK_SECRET_KEY } from "$env/static/private";
import { Clerk } from "@clerk/backend";

export const clerkClient = Clerk({secretKey: PRIVATE_CLERK_SECRET_KEY});