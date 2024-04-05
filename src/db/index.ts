import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from "@/db/schema"

const migrationClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db", { max: 1 });

const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient, { schema});


export { db }