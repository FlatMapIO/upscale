import type { CacheStorage, ExecutionContext } from "@cloudflare/workers-types";

import { getRequestEvent, isServer } from "solid-js/web";

export type Bindings = {
  KV: KVNamespace;
  DB: D1Database;

  RATE_LIMITER: {
    limit(args: { key: string }): Promise<{ success: boolean }>;
  };
};

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
    cloudflare: {
      env: any;
      cf: CfProperties;
      ctx: ExecutionContext;
      caches: CacheStorage;
    };
  }
}

export function createServerContextAccessor<E = Bindings>() {
  return () => {
    if (!isServer) {
      throw new Error("You must call this function only in server environment");
    }
    const event = getRequestEvent()!;
    const cf = event.locals.cloudflare;
    return {
      ...cf,
      env: cf.env as E,
      event,
    };
  };
}
