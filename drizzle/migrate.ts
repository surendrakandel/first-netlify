import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { createClient } from '@libsql/client';

export const client = createClient({
    url: 'libsql://firstshipper-dev-surendrakandel.turso.io',
    authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTEyLTA3VDAzOjQxOjAyLjI5Mzk0NDMwOFoiLCJpZCI6IjU4YTJhOTBkLTk0YjItMTFlZS1hNmZlLTdhNTJlMWY3NzU5YSJ9.-Quw-eoa0Lpn2K4MTUtrjodcsRvFHog1_QcUjuckIyXmVZQ3ky4wmLCMAmBZvUN4NJLqWsY_Lvc9qEWHjZM_BA'
  })

console.log('Running migrations');
export const db = drizzle(client);

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: 'drizzle/migrations'
    });
    console.log('Tables migrated!');
    process.exit(0);
  } catch (error) {
    console.error('Error performing migration: ', error);
    process.exit(1);
  }
}
  
  main();