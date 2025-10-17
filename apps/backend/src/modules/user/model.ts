import { t } from "elysia";

const userSchema = t.Object({
  id: t.String(),
  nickname: t.String(),
  name: t.Optional(t.Union([t.String(), t.Null()])),
  email: t.String({ format: "email" }),
  level: t.Number(),
  xp: t.Number(),
  created_at: t.Date(),
  updated_at: t.Optional(t.Union([t.Date(), t.Null()])),
  deleted_at: t.Optional(t.Union([t.Date(), t.Null()])),
});

export const getUsersResponseSchema = t.Array(userSchema);
