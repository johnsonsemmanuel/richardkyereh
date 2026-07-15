import { clearAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export async function logoutAction() {
  "use server";
  await clearAdminSession();
  redirect("/login");
}
