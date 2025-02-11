import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: `${process.env.TURSO_DB_URL}`,
  authToken: `${process.env.TURSO_DB_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);
const db = new PrismaClient({ adapter });

export default db;
