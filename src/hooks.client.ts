import * as Sentry from '@sentry/svelte';
import { BrowserTracing } from '@sentry/tracing';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
import {initializeClerkClient} from 'clerk-sveltekit/client';

Sentry.init({
  dsn: 'https://171b717c6bb741089d396fb280a12a7e@o1151788.ingest.sentry.io/6333081',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0
});
export async function  handle({event, resolve}:any) {
  // Incoming 
  console.log('event is', event);
  // Locals(one time use variables that backend can use)
  // Do things before `load` is invoked
  const result = resolve(event);
  // Do things after `load` is invoked
  return result;
}
export async function handleError({ error, event }) {
  console.log('error is', error);
  const errorId = crypto.randomUUID();
  // example integration with https://sentry.io/
  // @ts-expect-error
  Sentry.captureException(error, { event, errorId });
  return {
    message: 'Whoops!',
    errorId
  };
};

initializeClerkClient(PUBLIC_CLERK_PUBLISHABLE_KEY,{
	afterSignInUrl: '/admin/',
	afterSignUpUrl: '/admin/',
	signInUrl: '/login',
	signUpUrl: '/signup',
} )

