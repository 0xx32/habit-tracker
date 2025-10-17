import { defineConfig } from "drizzle-kit";

import { DB_CONFIG } from "@/config/db.config";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schemes",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_CONFIG.URL,
  },
  casing: "snake_case",
});
