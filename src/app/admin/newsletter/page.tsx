import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@sanity/client";

function getSanityClient() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || "production";
  const token = process.env.SANITY_WRITE_TOKEN;

  if (!projectId || !token) return null;

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2024-01-01",
    useCdn: false,
  });
}

async function getNewsletters() {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch(
    `*[_type == "newsletterSubscription"] | order(subscribedAt desc) {
      _id, email, subscribedAt, source
    }`
  );
}

export default async function AdminNewsletterPage() {
  if (!await isAdminAuthenticated()) {
    redirect("/login");
  }

  const newsletters = await getNewsletters();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Newsletter Subscribers</h1>
        <p className="text-sm text-foreground/60">Manage newsletter subscriptions</p>
      </div>
      <div className="bg-card rounded-xl border border-input shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-input">
              {newsletters.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-sm text-foreground/50">
                    No subscribers yet
                  </td>
                </tr>
              ) : (
                newsletters.map((sub: { _id: string; email: string; subscribedAt: string; source?: string }) => (
                  <tr key={sub._id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{sub.email}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70 capitalize">{sub.source || "Website"}</td>
                    <td className="px-6 py-4 text-sm text-foreground/50">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
