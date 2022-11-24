import path from "node:path";
import {
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/cloudflare";

export const uploadHandler = unstable_composeUploadHandlers(
  unstable_createFileUploadHandler({
    maxPartSize: 5_000_000,
    file: ({ filename }) => filename,
    avoidFileConflicts: true,
    directory: path.join(process.cwd(), "public", "uploads"),
  }),
  // parse everything else into memory
  unstable_createMemoryUploadHandler()
);
