import { extname } from "node:path";

/**
 * The project's `tsconfig.json` uses `moduleResolution: "bundler"`, so
 * production source files import each other without file extensions
 * (`./checkout-config`, not `./checkout-config.ts`) — Next.js's bundler
 * resolves that; a bare `node --test` run does not. Rather than editing
 * every import in `src/` to add `.ts` extensions just to satisfy Node's
 * loader, this hook re-tries an unresolvable relative specifier with `.ts`
 * appended, so test files can import the real production modules unchanged.
 */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith(".") && !extname(specifier)) {
    try {
      return await nextResolve(`${specifier}.ts`, context);
    } catch {
      // Fall through to the default resolution/error below.
    }
  }
  return nextResolve(specifier, context);
}
