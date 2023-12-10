import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { handleClerk } from 'clerk-sveltekit/server'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { PRIVATE_AWS_API_KEY, PRIVATE_AWS_SECRET_KEY, PRIVATE_CLERK_SECRET_KEY } from '$env/static/private';
import { Clerk, User } from '@clerk/backend';
import { getBusinessCount } from './apis/business/get_business_count';
import { CreateUser } from './apis/createUser';
let clearClient = Clerk({secretKey: PRIVATE_CLERK_SECRET_KEY, apiKey: PRIVATE_AWS_API_KEY});

export const handle: Handle = sequence(
	handleClerk(PRIVATE_CLERK_SECRET_KEY, {
		debug: true,
		protectedPaths: ['/admin'],
		signInUrl: '/login',
	})
)
