import FeaturedEvents from "@/components/FeaturedEvents";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import TopOrganizers from "@/components/TopOrganizers";
import WhyChoose from "@/components/WhyChoose";

export default async function HomePage() {

  const stats = {
    totalEvents: 30,
    totalAttendees: 4000,
    totalOrgs: 10
  }
  return (
    <div>
      <Hero />
      <FeaturedEvents />
      <WhyChoose />
      <Statistics stats={stats} />
      <TopOrganizers />
      <Testimonials />
    </div>
  );
}

