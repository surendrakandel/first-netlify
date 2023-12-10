
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const users = sqliteTable('auth_user', {
	id: text('id', {
		length: 15
	}).primaryKey(),
	username: text('username', {
		length: 55
	}).unique(),
	email: text('email').notNull(),
	email_verified: integer('email_verified', { mode: 'boolean' }).default(false),
	created_at: text('created_at'),
	updated_at: text('updated_at'),
	businessId: text('businessId'),
	name: text('name', { length: 255 })
});
export type User = typeof users.$inferSelect;

export const userKey = sqliteTable('user_key', {
	id: text('id').primaryKey(),
	user_id: text('user_id').references(() => users.id),
	hashed_password: text('hashed_password', { length: 255 })
});
export type UserKey = typeof userKey.$inferSelect;
export const userSessionTable = sqliteTable('user_session', {
	id: text('id').primaryKey(),
	user_id: text('user_id').references(() => users.id),
	active_expires: integer('active_expires', {
		mode: 'number'
	}).notNull(),
	idle_expires: integer('idle_expires', {
		mode: 'number'
	}).notNull(),
	state: text('state'),
	fresh: text('fresh'),
});
export type UserSession = typeof userSessionTable.$inferSelect;
export const userEmailVerificationTable = sqliteTable('email_verification_token', {
	id: text('id').primaryKey(),
	user_id: text('user_id').references(() => users.id),
	expires: integer('expires', {
		mode: 'number'
	}).notNull()
});
export type UserEmailVerification = typeof userEmailVerificationTable.$inferSelect;
export const userPasswordVerificationTable = sqliteTable('password_reset_token', {
	id: text('id').primaryKey(),
	user_id: text('user_id').references(() => users.id),
	expires: integer('expires', {
		mode: 'number'
	}).notNull()
});
export type UserPasswordVerification = typeof userPasswordVerificationTable.$inferSelect;