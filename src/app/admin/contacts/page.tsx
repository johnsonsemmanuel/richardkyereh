import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@sanity/client";

function getSanityClient() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || "production";

  if (!projectId) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
  });
}

async function getContacts() {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch(
    `*[_type == "contactSubmission"] | order(createdAt desc) {
      _id, name, email, phone, company, inquiryType, subject, message, status, createdAt
    }`
  );
}

export default async function AdminContactsPage() {
  if (!await isAdminAuthenticated()) {
    redirect("/login");
  }

  const contacts = await getContacts();

  const statusColors: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-500",
    read: "bg-yellow-500/10 text-yellow-500",
    replied: "bg-green-500/10 text-green-500",
    closed: "bg-red-500/10 text-red-500",
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Contact Submissions</h1>
        <p className="text-sm text-foreground/60">Manage contact form requests</p>
      </div>
      <div className="bg-card rounded-xl border border-input shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Inquiry Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-input">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-foreground/50">
                    No contact submissions found
                  </td>
                </tr>
              ) : (
                contacts.map((contact: { _id: string; name: string; subject: string; status: string; email: string; company?: string; inquiryType?: string; createdAt: string }) => (
                  <tr key={contact._id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{contact.name}</p>
                        {contact.company && <p className="text-xs text-foreground/50">{contact.company}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{contact.email}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{contact.subject}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70 capitalize">{contact.inquiryType || "General"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[contact.status] || "bg-gray-500/10 text-gray-500"}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/50">
                      {new Date(contact.createdAt).toLocaleDateString()}
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
