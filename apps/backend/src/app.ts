import { Elysia } from "elysia";

import { CONFIG } from "./config";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .listen(3000)
  .onStart(() => {
    // eslint-disable-next-line no-console
    console.info(`Server started on port ${CONFIG.PORT}`);
  });

app.listen(CONFIG.PORT);
