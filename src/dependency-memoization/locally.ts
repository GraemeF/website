import { Effect, Context, Layer } from "effect"

class A extends Context.Tag("A")<A, { readonly a: number }>() {}

const a = Layer.effect(
  A,
  Effect.succeed({ a: 5 }).pipe(Effect.tap(() => Effect.log("initialized")))
)

const program = Effect.gen(function* (_) {
  yield* _(A, Effect.provide(a))
  yield* _(A, Effect.provide(a))
})

Effect.runPromise(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=initialized
timestamp=... level=INFO fiber=#0 message=initialized
*/
