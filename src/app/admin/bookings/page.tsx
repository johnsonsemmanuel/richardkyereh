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

async function getBookings() {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch(
    `*[_type == "bookingSubmission"] | order(createdAt desc) {
      _id, name, email, phone, company, service, date, time, videoCall, message, status, createdAt
    }`
  );
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-500",
  contacted: "bg-yellow-500/10 text-yellow-500",
  confirmed: "bg-green-500/10 text-green-500",
  cancelled: "bg-red-500/10 text-red-500",
};

export default async function AdminBookingsPage() {
  if (!await isAdminAuthenticated()) {
    redirect("/login");
  }

  const bookings = await getBookings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
        <p className="text-sm text-muted-foreground">Manage booking submissions</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-card rounded-xl border border-input shadow-card p-8 text-center">
          <p className="text-sm text-muted-foreground">No bookings found</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-card rounded-xl border border-input shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date/Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-input">
                  {bookings.map((booking: { _id: string; name: string; service: string; status: string; email: string; company?: string; date?: string; time?: string; createdAt: string }) => (
                    <tr key={booking._id} className="hover:bg-secondary transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{booking.name}</p>
                          {booking.company && <p className="text-xs text-muted-foreground">{booking.company}</p>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/70">{booking.email}</td>
                      <td className="px-6 py-4 text-sm text-foreground/70">{booking.service}</td>
                      <td className="px-6 py-4 text-sm text-foreground/70">
                        {booking.date && <div>{booking.date}</div>}
                        {booking.time && <div className="text-xs text-muted-foreground">{booking.time}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[booking.status] || "bg-gray-500/10 text-gray-500"}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {bookings.map((booking: { _id: string; name: string; service: string; status: string; email: string; company?: string; date?: string; time?: string; message?: string; createdAt: string }) => (
              <div key={booking._id} className="bg-card rounded-xl border border-input shadow-card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{booking.name}</p>
                    {booking.company && <p className="text-xs text-muted-foreground">{booking.company}</p>}
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[booking.status] || "bg-gray-500/10 text-gray-500"}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-16 shrink-0">Email</span>
                    <span className="truncate">{booking.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-16 shrink-0">Service</span>
                    <span>{booking.service}</span>
                  </div>
                  {booking.date && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground w-16 shrink-0">Date</span>
                      <span>{booking.date}{booking.time ? ` at ${booking.time}` : ""}</span>
                    </div>
                  )}
                  {booking.message && (
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-16 shrink-0">Message</span>
                      <span className="line-clamp-2">{booking.message}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 pt-1 border-t border-input">
                    <span className="text-muted-foreground">Submitted</span>
                    <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
