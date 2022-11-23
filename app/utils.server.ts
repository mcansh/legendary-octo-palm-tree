import path from "node:path";
import fsp from "node:fs/promises";
import { json } from "@remix-run/node";

let DB_PATH = path.join(process.cwd(), "app", "db.json");

type TENANT = {
  id: string;
  name: string;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  nav_links: Array<{
    href: string;
    text: string;
  }>;
};

export async function getTenant(tenant: string) {
  let TENANTS_CONTENT = await fsp.readFile(DB_PATH, "utf-8");
  let TENANTS: Array<TENANT> = JSON.parse(TENANTS_CONTENT);

  if (tenant === "tenant1") {
    return TENANTS.find((t) => t.id === "tenant1");
  }

  throw json({ message: "Invalid tenant" }, { status: 404 });
}

export async function updateTenant(tenant: string, data: any) {
  let TENANTS_CONTENT = await fsp.readFile(DB_PATH, "utf-8");
  let TENANTS: Array<TENANT> = JSON.parse(TENANTS_CONTENT);

  if (tenant === "tenant1") {
    let newContent = TENANTS.map((t) => {
      if (t.id === tenant) {
        return { ...t, ...data };
      }

      return t;
    });

    await fsp.writeFile(DB_PATH, JSON.stringify(newContent, null, 2));
  }

  throw json({ message: "Invalid tenant" }, { status: 404 });
}
