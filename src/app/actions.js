"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handlePaymentSuccessRedirect() {
  // ১. পাথগুলো রিভ্যালিডেট করুন
  revalidatePath("/dashboard/organizer");
  revalidatePath("/dashboard/organizer/manage-events");
  revalidatePath("/dashboard/organizer/attendees");
  revalidatePath("/dashboard/attendee");
  revalidatePath("/dashboard/attendee/tickets");
  revalidatePath("/dashboard/attendee/payments");

  // ২. রিডাইরেক্ট করে দিন
  redirect("/dashboard/attendee/tickets");
}