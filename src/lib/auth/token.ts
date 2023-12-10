// import { generateRandomString, isWithinExpiration } from 'lucia/utils';
// import { eq } from 'drizzle-orm';
// import { db } from '$src/lib/db';
// import { userEmailVerificationTable, userPasswordVerificationTable } from '../db/schemas/user';

// const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

// export const generateEmailVerificationToken = async (userId: string) => {
// 	const storedUserTokens = await db
// 		.select()
// 		.from(userEmailVerificationTable)
// 		.where(eq(userEmailVerificationTable.user_id, userId));
// 	if (storedUserTokens.length > 0) {
// 		const reusableStoredToken = storedUserTokens.find((token) => {
// 			// check if expiration is within 1 hour
// 			// and reuse the token if true
// 			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
// 		});
// 		if (reusableStoredToken) return reusableStoredToken.id;
// 	}
// 	const token = generateRandomString(63);
// 	await db
// 		.insert(userEmailVerificationTable)
// 		.values({ user_id: userId, id: token, expires: new Date().getTime() + EXPIRES_IN });

// 	return token;
// };

// export const validateEmailVerificationToken = async (token: string) => {
// 	console.log('Validating Token', token);
// 	const storedToken = await db.transaction(async (trx) => {
// 		const [storedToken] = await trx
// 			.select()
// 			.from(userEmailVerificationTable)
// 			.where(eq(userEmailVerificationTable.id, token))
// 			.limit(1);
// 		console.log(storedToken);
// 		if (!storedToken || storedToken.user_id === '' || storedToken.user_id === null) {
// 			console.log('Invalid Token Checked');
// 			throw new Error('Invalid token');
// 		}
// 		await trx
// 			.delete(userEmailVerificationTable)
// 			.where(eq(userEmailVerificationTable.user_id, storedToken.user_id));
// 		console.log('Token Deleted');
// 		return storedToken;
// 	});
// 	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
// 	if (!isWithinExpiration(tokenExpires)) {
// 		throw new Error('Expired token');
// 	}
// 	return storedToken.user_id;
// };

// export const generatePasswordResetToken = async (userId: string) => {
// 	const storedUserTokens = await db
// 		.select()
// 		.from(userPasswordVerificationTable)
// 		.where(eq(userPasswordVerificationTable.user_id, userId));
// 	if (storedUserTokens.length > 0) {
// 		const reusableStoredToken = storedUserTokens.find((token) => {
// 			// check if expiration is within 1 hour
// 			// and reuse the token if true
// 			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
// 		});
// 		if (reusableStoredToken) return reusableStoredToken.id;
// 	}
// 	const token = generateRandomString(63);
// 	await db
// 		.insert(userPasswordVerificationTable)
// 		.values({ user_id: userId, id: token, expires: new Date().getTime() + EXPIRES_IN });
// 	return token;
// };

// export const validatePasswordResetToken = async (token: string) => {
// 	const storedToken = await db.transaction(async (trx) => {
// 		const [storedToken] = await trx
// 			.select()
// 			.from(userPasswordVerificationTable)
// 			.where(eq(userPasswordVerificationTable.id, token))
// 			.limit(1);
// 		if (!storedToken) throw new Error('Invalid token');
// 		await trx
// 			.delete(userPasswordVerificationTable)
// 			.where(eq(userPasswordVerificationTable.id, storedToken.id));
// 		return storedToken;
// 	});
// 	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
// 	if (!isWithinExpiration(tokenExpires)) {
// 		throw new Error('Expired token');
// 	}
// 	return storedToken.user_id;
// };

// export const isValidPasswordResetToken = async (token: string) => {
// 	const [storedToken] = await db
// 		.select()
// 		.from(userPasswordVerificationTable)
// 		.where(eq(userPasswordVerificationTable.id, token));
// 	if (!storedToken) return false;
// 	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
// 	if (!isWithinExpiration(tokenExpires)) {
// 		return false;
// 	}
// 	return true;
// };
