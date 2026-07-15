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

async function getBookings() {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch(
    `*[_type == "bookingSubmission"] | order(createdAt desc) {
      _id, name, email, phone, company, service, date, time, videoCall, message, status, createdAt
    }`
  );
}

export default async function AdminBookingsPage() {
  if (!await isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const bookings = await getBookings();

  const statusColors: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-500",
    contacted: "bg-yellow-500/10 text-yellow-500",
    confirmed: "bg-green-500/10 text-green-500",
    cancelled: "bg-red-500/10 text-red-500",
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
        <p className="text-sm text-foreground/60">Manage booking submissions</p>
      </div>
      <div className="bg-card rounded-xl border border-input shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Date/Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-input">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-foreground/50">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((booking: { _id: string; name: string; service: string; status: string; email: string; company?: string; date?: string; time?: string; createdAt: string }) => (
                  <tr key={booking._id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{booking.name}</p>
                        {booking.company && <p className="text-xs text-foreground/50">{booking.company}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{booking.email}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{booking.service}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">
                      {booking.date && <div>{booking.date}</div>}
                      {booking.time && <div className="text-xs text-foreground/50">{booking.time}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[booking.status] || "bg-gray-500/10 text-gray-500"}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/50">
                      {new Date(booking.createdAt).toLocaleDateString()}
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
