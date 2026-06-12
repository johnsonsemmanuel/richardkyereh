import { createClient } from "@sanity/client";

function getClient() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || "production";
  const token = process.env.SANITY_WRITE_TOKEN;

  if (!projectId || !token) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2024-01-01",
    useCdn: false,
  });
}

interface SanityDoc {
  _type: string;
  [key: string]: unknown;
}

export async function createSubmission(doc: SanityDoc) {
  const client = getClient();
  if (!client) {
    return { success: true, fallback: true, data: doc };
  }
  return client.create(doc);
}
