import { isAdminAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="md:ml-64 pt-14 md:pt-0">{children}</div>
    </div>
  );
}
