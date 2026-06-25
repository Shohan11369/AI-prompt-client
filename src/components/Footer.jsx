import Link from "next/link";
import { FaRobot, FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 pt-16 pb-12 mt-auto text-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
           
            <div className="bg-gradient-to-tr from-brand-primary to-indigo-600 p-2 rounded-lg text-white">
              <FaRobot className="text-lg" />
            </div>
          
            <span className="font-extrabold text-xl tracking-tight text-slate-950">
              AI
            </span>
          </Link>
          <p className="text-slate-600 text-sm leading-relaxed">
            The next-generation prompt discovery and seamless management platform connecting AI creators with powerful tools.
          </p>
          <div className="flex gap-4 text-slate-500">
            <a href="#" className="hover:text-brand-primary transition-colors"><FaFacebook size={18} /></a>
            <a href="#" className="hover:text-brand-primary transition-colors"><FaTwitter size={18} /></a>
            <a href="#" className="hover:text-brand-primary transition-colors"><FaInstagram size={18} /></a>
            <a href="#" className="hover:text-brand-primary transition-colors"><FaGithub size={18} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-slate-950 font-semibold text-sm uppercase tracking-wider mb-4">Discover Tools</h3>
          <ul className="space-y-2 text-slate-600 text-sm">
       
            <li><Link href="/events?category=Productivity" className="hover:text-brand-primary transition-colors">Productivity</Link></li>
            <li><Link href="/events?category=Design" className="hover:text-brand-primary transition-colors">AI Design Tools</Link></li>
            <li><Link href="/events?category=Development" className="hover:text-brand-primary transition-colors">Development AI</Link></li>
            <li><Link href="/events?category=Marketing" className="hover:text-brand-primary transition-colors">Marketing Automation</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-slate-950 font-semibold text-sm uppercase tracking-wider mb-4">For Creators</h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li><Link href="/register?role=organizer" className="hover:text-brand-primary transition-colors">Create Profile</Link></li>
            <li><Link href="/login" className="hover:text-brand-primary transition-colors">Submit Prompt</Link></li>
            <li><Link href="/login" className="hover:text-brand-primary transition-colors">Premium Tools</Link></li>
            <li><a href="#" className="hover:text-brand-primary transition-colors">Monetization</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-slate-950 font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li><a href="#" className="hover:text-brand-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-brand-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-200 mt-12 pt-8 text-center text-slate-500 text-xs">
        
        <p>&copy; {new Date().getFullYear()} AI Inc. All rights reserved. Developed by Antigravity AI.</p>
      </div>
    </footer>
  );
}