import type { D1Database } from '@cloudflare/workers-types';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { AuthRequest } from 'lucia';
import type { UserResource } from "@clerk/types";
declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
			session:
				| {
						userId: string
						claims: unknown
				  }
				| undefined;
		}
		interface Error {
			message: string;
			errorId: string;
		}
		interface PageData {
			session: Session | null;
		}
	}
	namespace Lucia {
		type Auth = import("$src/lib/auth/lucia").Auth
		type DatabaseUserAttributes = {
			email: string;
			id: string;
			email_verified: boolean | null;
			created_at: string;
			updated_at: string;
			businessId: string | null;
			name: string;

		};
		type DatabaseSessionAttributes = Record<string, never>;
	}
}
export {}
declare global {
	interface DocumentEventMap {
	  'clerk-sveltekit:user': CustomEvent<UserResource>;
	}
  }
