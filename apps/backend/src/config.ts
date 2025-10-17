import * as env from "env-var";

export const CONFIG = {
  PORT: env.get("PORT").required().asIntPositive(),
};
