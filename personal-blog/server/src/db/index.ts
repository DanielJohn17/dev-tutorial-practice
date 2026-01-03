import z from "zod";
import { drizzle } from "drizzle-orm/node-postgres";
import "@/utils/dotenv_config";

const EnvShema = z.object({
  DATABASE_URL: z.url(),
});

const processEnv = EnvShema.parse(process.env);

export const db = drizzle(processEnv.DATABASE_URL);
