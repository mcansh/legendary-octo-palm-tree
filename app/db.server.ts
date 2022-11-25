import type { AppLoadContext, DataFunctionArgs } from "@remix-run/cloudflare";
import { D1QB } from "workers-qb";

export interface Queue<Body = any> {
  send(body: Body): Promise<void>;
}

export interface SalonContext extends AppLoadContext {
  SALON_DB: D1Database;
}

export interface SalonDataFunctionArgs extends DataFunctionArgs {
  context: SalonContext;
}

export function db(context: SalonContext) {
  return new D1QB(context.SALON_DB);
}
