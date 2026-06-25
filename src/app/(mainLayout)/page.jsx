import FeaturedEvents from "@/components/FeaturedEvents";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import HomepageDynamicTestimonials from "@/components/interactions/HomepageDynamicTestimonials";
import TopOrganizers from "@/components/TopOrganizers";
import WhyChoose from "@/components/WhyChoose";
import { baseURL } from "@/lib/api/baseUrl";
import { getStatistics } from "@/lib/api/statistics";


async function getHomeEvents() {
  try {
    
    const res = await fetch(`${baseURL}/api/events`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch events in HomePage:", error);
    return [];
  }
}

export default async function HomePage() {
  
  const homeEventsData = await getHomeEvents();
  const stats = await getStatistics();

  return (
    <div>
      <Hero />
      <FeaturedEvents />
      <WhyChoose />
      <Statistics stats={stats} />

      
      <TopOrganizers featuredOrgs={homeEventsData} />

      <HomepageDynamicTestimonials />
    </div>
  );
}
