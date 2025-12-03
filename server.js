const express = require("express");
const { initTRPC } = require("@trpc/server");
const { createExpressMiddleware } = require("@trpc/server/adapters/express");
const { z } = require("zod");

const t = initTRPC.create();

const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { message: `PDC CS Class, ${input.name}!` };
    }),

  add: t.procedure
    .input(z.object({ a: z.number(), b: z.number() }))
    .mutation(({ input }) => {
      return { result: input.a + input.b };
    }),
});

const app = express();

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

app.listen(3000, () => console.log("tRPC Server running on port 3000"));
