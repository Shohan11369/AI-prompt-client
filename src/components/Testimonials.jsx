"use client";
import Image from "next/image";
const testimonials = [
  {
    id: 1,
    quote: "Finding the perfect prompt for my projects on PromptMarket has been a game-changer. The categorization is spot on, and the prompts consistently deliver high-quality, professional results every time.",
    name: "Sarah Jenkins",
    role: "AI Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: 2,
    quote: "As a prompt engineer, I love the creator dashboard. It makes tracking my sales and managing my prompt library incredibly easy. The secure payout system gives me total peace of mind.",
    name: "Marcus Brody",
    role: "Professional Prompt Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
];

export default function Testimonials() {
  return (
    <section className=" py-24 max-w-7xl mx-auto px-6 w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-950 md:text-4xl font-sans">Client Reviews</h2>
        <p className="text-black max-w-xl mx-auto text-sm mt-3">
          Don't just take our word for it. Hear from creators and users thriving on the platform.
        </p>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t) => (
          <div 
            key={t.id} 
            className="bg-slate-800 border border-slate-600 hover:border-brand-primary/30 transition-all duration-300 p-8 rounded-2xl space-y-6 relative hover:-translate-y-1"
          >
            <p className="text-white italic text-md leading-relaxed">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-4">
              <Image
                width={48}
                height={48}
                src={t.image}
                className="rounded-full h-12 w-12 object-cover shrink-0"
                alt={t.name}
              />
              <div>
                <h4 className="text-white font-bold text-sm">{t.name}</h4>
                <p className="text-brand-primary text-xs font-semibold">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
