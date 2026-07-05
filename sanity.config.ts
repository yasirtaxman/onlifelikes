"use client";

/**
 * Sanity Studio configuration — the admin panel served at /studio.
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local (see README).
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-project";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "onlifelikes",
  title: "On Life Likes — Content Studio",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("post").title("Articles"),
            S.documentTypeListItem("product").title("Products"),
            S.divider(),
            S.documentTypeListItem("category").title("Categories"),
            S.documentTypeListItem("author").title("Authors"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
