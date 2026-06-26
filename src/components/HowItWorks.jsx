"use client";

import { FaSearch, FaCreditCard, FaPlay } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: FaSearch,
      color: "from-pink-500 to-rose-500",
      title: "1. Discover Prompts",
      description: "Explore our collection of highly optimized, verified prompt templates for Midjourney, ChatGPT, and more.",
    },
    {
      icon: FaCreditCard,
      color: "from-purple-500 to-indigo-500",
      title: "2. Secure Checkout",
      description: "Purchase prompts safely using Stripe. Payouts are directly sent to creators, keeping the marketplace secure.",
    },
    {
      icon: FaPlay,
      color: "from-cyan-500 to-blue-500",
      title: "3. Deploy & Generate",
      description: "Get instant access to prompt configurations, customize values, and run them to generate stunning AI outputs.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-pink-900/10 via-brand-secondary/10 to-transparent border-t border-slate-100 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-3 py-1.5 rounded-full">
            Simple & Fast
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 md:text-4xl mt-4">
            How PromptMarket Works
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm mt-3">
            Get top-tier AI generations in minutes with our streamlined discovery and checkout process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Connector lines for desktop layout */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 -translate-y-12 z-0 opacity-40" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="relative bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1.5 group z-10"
              >
                {/* Glow Background Effect on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-[0.03] rounded-3xl transition-opacity duration-300`} />
                
                {/* Step Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} text-white flex items-center justify-center rounded-2xl shadow-lg shadow-indigo-500/10 mb-8 transform group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>

                {/* Step Title */}
                <h3 className="text-xl font-bold text-slate-950 mb-3 group-hover:text-brand-primary transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
