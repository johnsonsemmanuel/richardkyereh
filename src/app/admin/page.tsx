import { redirect } from "next/navigation";
import { Suspense } from "react";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import Link from "next/link";
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

async function getStats() {
  const client = getSanityClient();
  if (!client) return null;

  const [bookings, contacts, newsletters, posts] = await Promise.all([
    client.fetch(`count(*[_type == "bookingSubmission"])`),
    client.fetch(`count(*[_type == "contactSubmission"])`),
    client.fetch(`count(*[_type == "newsletterSubscription"])`),
    client.fetch(`count(*[_type == "post"])`),
  ]);

  const recentBookings = await client.fetch(
    `*[_type == "bookingSubmission"] | order(createdAt desc) [0...5] {
      _id, name, email, service, createdAt, status
    }`
  );

  const recentContacts = await client.fetch(
    `*[_type == "contactSubmission"] | order(createdAt desc) [0...5] {
      _id, name, email, subject, createdAt, status
    }`
  );

  return {
    bookings,
    contacts,
    newsletters,
    posts,
    recentBookings,
    recentContacts,
  };
}

async function AdminStats() {
  const stats = await getStats();
  if (!stats) {
    return (
      <div className="text-center text-foreground/60 py-12">
        <p>Unable to load statistics. Please check your Sanity configuration.</p>
      </div>
    );
  }

  const statCards = [
    { label: "Total Bookings", value: stats.bookings, href: "/admin/bookings", color: "text-blue-500" },
    { label: "Contact Submissions", value: stats.contacts, href: "/admin/contacts", color: "text-green-500" },
    { label: "Newsletter Subscribers", value: stats.newsletters, href: "/admin/newsletter", color: "text-purple-500" },
    { label: "Blog Posts", value: stats.posts, href: "/admin/blog", color: "text-orange-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat) => (
        <Link
          key={stat.label}
          href={stat.href}
          className="bg-card p-6 rounded-xl border border-input shadow-card hover:border-foreground/20 transition-colors"
        >
          <p className="text-sm text-foreground/50 mb-1">{stat.label}</p>
          <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
        </Link>
      ))}
    </div>
  );
}

async function RecentBookings() {
  const stats = await getStats();
  if (!stats) return null;

  return (
    <div className="bg-card rounded-xl border border-input shadow-card overflow-hidden">
      <div className="px-6 py-4 border-b border-input">
        <h3 className="font-semibold text-foreground">Recent Bookings</h3>
      </div>
      <div className="divide-y divide-input">
        {stats.recentBookings.length === 0 ? (
          <p className="px-6 py-4 text-sm text-foreground/50">No bookings yet</p>
        ) : (
          stats.recentBookings.map((booking: { _id: string; name: string; service: string; status: string }) => (
            <div key={booking._id} className="px-6 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{booking.name}</p>
                <p className="text-xs text-foreground/50">{booking.service}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                booking.status === "new" ? "bg-blue-500/10 text-blue-500" :
                booking.status === "contacted" ? "bg-yellow-500/10 text-yellow-500" :
                booking.status === "confirmed" ? "bg-green-500/10 text-green-500" :
                "bg-red-500/10 text-red-500"
              }`}>
                {booking.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

async function RecentContacts() {
  const stats = await getStats();
  if (!stats) return null;

  return (
    <div className="bg-card rounded-xl border border-input shadow-card overflow-hidden">
      <div className="px-6 py-4 border-b border-input">
        <h3 className="font-semibold text-foreground">Recent Contact Submissions</h3>
      </div>
      <div className="divide-y divide-input">
        {stats.recentContacts.length === 0 ? (
          <p className="px-6 py-4 text-sm text-foreground/50">No submissions yet</p>
        ) : (
          stats.recentContacts.map((contact: { _id: string; name: string; subject: string; status: string }) => (
            <div key={contact._id} className="px-6 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{contact.name}</p>
                <p className="text-xs text-foreground/50">{contact.subject}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                contact.status === "new" ? "bg-blue-500/10 text-blue-500" :
                contact.status === "read" ? "bg-yellow-500/10 text-yellow-500" :
                contact.status === "replied" ? "bg-green-500/10 text-green-500" :
                "bg-red-500/10 text-red-500"
              }`}>
                {contact.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default async function AdminDashboard() {
  if (!await isAdminAuthenticated()) {
    redirect("/login");
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-foreground/60">Welcome back, Richard</p>
      </div>

      <Suspense fallback={<div className="text-center text-foreground/60 py-12">Loading stats...</div>}>
        <AdminStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div className="text-center text-foreground/60 py-12">Loading bookings...</div>}>
          <RecentBookings />
        </Suspense>
        <Suspense fallback={<div className="text-center text-foreground/60 py-12">Loading contacts...</div>}>
          <RecentContacts />
        </Suspense>
      </div>
    </div>
  );
}
