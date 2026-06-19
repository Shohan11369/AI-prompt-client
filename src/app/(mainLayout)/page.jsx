import FeaturedEvents from "@/components/FeaturedEvents";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import TopOrganizers from "@/components/TopOrganizers";
import WhyChoose from "@/components/WhyChoose";
import { baseURL } from "@/lib/api/baseUrl";

// 💡 ডাটাবেজ থেকে এআই টুলস/ইভেন্টসের ডেটা ফেচ করার ফাংশন
async function getHomeEvents() {
  try {
    // আপনার জেসন ডেটাগুলো যে এন্ডপয়েন্টে আছে (যেমন /api/events) সেটি কল করা হলো
    const res = await fetch(`${baseURL}/api/events`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch events in HomePage:", error);
    return [];
  }
}

export default async function HomePage() {
  // ডাটাবেজ থেকে ১০টি এআই টুলের অ্যারে ডাটা চলে আসবে এখানে
  const homeEventsData = await getHomeEvents();

  const stats = {
    totalEvents: 30,
    totalAttendees: 4000,
    totalOrgs: 10,
  };

  return (
    <div>
      <Hero />
      <FeaturedEvents />
      <WhyChoose />
      <Statistics stats={stats} />

      {/* 💡 ফিক্সড: ডাটাবেজের ডেটা প্রোপস হিসেবে পাস করা হলো */}
      <TopOrganizers featuredOrgs={homeEventsData} />

      <Testimonials />
    </div>
  );
}