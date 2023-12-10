import { Config } from 'drizzle-kit';


export default {
  schema: './src/lib/db/schemas/*',
  out: './drizzle/migrations',
  driver: 'turso',
  dbCredentials: {
    url: "https://firstshipper-dev-surendrakandel.turso.io" || '',
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlLWhSU3BTSkVlNm1fbnBTNGZkMW1nIn0.XM3are4J0lMrw-E6bD4vvQDq1qYZhQaNM5oqSD3wN2m8fJ3a939TWskgCY8YlSdrua_E4zIXE1wnrKUYwBLbBA" || ''
  }
} satisfies Config;