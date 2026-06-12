import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  name: "richard-kyereh",
  title: "Richard Kyereh",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
