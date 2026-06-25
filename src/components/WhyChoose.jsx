"use client";

import { FaAward, FaShieldAlt, FaUsers } from "react-icons/fa";

export default function WhyChoose() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">Why Choose PromptMarket</h2>
        <p className="text-slate-600 max-w-xl mx-auto text-sm mt-3">
          Delivering an elite and state-of-the-art prompt marketplace that empowers every AI creator.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-brand-primary/30 transition duration-300 group">
          <div className="bg-brand-primary/10 text-brand-primary p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
            <FaAward size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-950 mb-3">Premium Prompts Only</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every prompt listed is moderated by administrators to guarantee maximum platform authenticity and top-tier AI generation results.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-indigo-500/30 transition duration-300 group">
          <div className="bg-indigo-500/10 text-indigo-600 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
            <FaShieldAlt size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-950 mb-3">100% Secure Checkout</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Prompt purchases and creator payouts are integrated directly with Stripe Checkout, keeping transactions fast and secure.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-purple-500/30 transition duration-300 group">
          <div className="bg-purple-500/10 text-purple-600 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
            <FaUsers size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-950 mb-3">Creator Analytics</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Creators receive dedicated dashboards containing detailed tables of prompt usage, sales tracking, and real-time revenue stats.
          </p>
        </div>
      </div>
    </section>
  );
}
