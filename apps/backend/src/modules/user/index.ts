import { Elysia } from "elysia";

import { getUsersResponseSchema } from "./model";
import { UserService } from "./service";

export const userController = new Elysia({ prefix: "/users" }).get(
  "/",
  async () => UserService.getAll(),
  {
    response: {
      200: getUsersResponseSchema,
    },
  },
);
