/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Target, 
  CheckSquare, 
  BarChart3, 
  Trophy, 
  Star, 
  Menu, 
  X,
  Twitter,
  Linkedin,
  Instagram,
  Zap,
  Building2,
  Laptop,
  ShoppingCart,
  ClipboardList,
  Gavel,
  Factory,
  HeartPulse,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';

// Provided assets
const LOGO_2D = "https://api.aistudio.google.com/v1/files/input_file_3.png";
const LOGO_3D = "https://api.aistudio.google.com/v1/files/input_file_2.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={LOGO_2D} alt="Logo" className="w-10 h-10 rounded-xl shadow-sm" />
          <span className="text-xl font-bold tracking-tight text-dark">MatchTrack</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How It Works', 'For Companies', 'Contact Us'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-secondary-text transition-colors hover:text-dark"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="bg-dark text-white px-6 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>

        <button 
          className="md:hidden text-dark"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {['Features', 'How It Works', 'For Companies', 'Contact Us'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-lg font-medium text-dark"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="bg-dark text-white px-6 py-3 rounded-full text-sm font-bold w-full mt-2">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const StatCard = ({ number, label, description }: { number: string, label: string, description: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const targetNum = parseInt(number.replace(/\D/g, ''));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = targetNum / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetNum) {
          setCount(targetNum);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, targetNum]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-gray-100 p-10 rounded-3xl shadow-sm"
    >
      <div className="text-6xl font-bold text-accent mb-4">
        {count}{number.includes('+') ? '+' : number.includes('%') ? '%' : ''}
      </div>
      <div className="text-xl font-bold text-dark mb-2">{label}</div>
      <p className="text-secondary-text">{description}</p>
    </motion.div>
  );
};

const FeatureCard = ({ title, description, badge }: { title: string, description: string, badge: string }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="bg-[#151515] border border-white/5 p-10 rounded-3xl transition-all duration-300"
  >
    <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
    <p className="text-white/50 text-lg leading-relaxed mb-6">{description}</p>
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-accent"></div>
      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{badge}</span>
    </div>
  </motion.div>
);

const ProblemCard = ({ title, description, iconColor }: { title: string, description: string, iconColor: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm flex flex-col items-start"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${iconColor}`}>
      <XCircle className="w-6 h-6" />
    </div>
    <h3 className="text-2xl font-bold text-dark mb-3">{title}</h3>
    <p className="text-secondary-text leading-relaxed">{description}</p>
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-56 md:pb-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 px-5 py-2 rounded-full text-sm font-medium text-secondary-text mb-10 shadow-sm"
              >
                <span className="text-accent">🎓</span> Now accepting companies — Lagos, Nigeria
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl text-dark mb-10 leading-[1.05] font-extrabold"
              >
                The smarter way to find <br />
                <span className="text-accent italic font-serif font-normal">verified tech interns.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-secondary-text mb-14 leading-relaxed max-w-xl"
              >
                Stop guessing. LASU Internship MatchTrack connects Lagos State University Computer Science students to companies — based on verified skills, not just CVs.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-5 mb-16"
              >
                <button className="bg-dark text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
                  Join the Waitlist →
                </button>
                <button className="bg-white border border-gray-200 text-dark px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-sm">
                  See How It Works
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 text-secondary-text/60 text-sm font-medium"
              >
                <span className="text-accent">✦</span> 40+ companies already on the waitlist
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex justify-center md:justify-end"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative z-10"
              >
                <img 
                  src={LOGO_3D} 
                  alt="LASU Internship MatchTrack 3D Logo" 
                  className="w-full max-w-[400px] lg:max-w-[500px] drop-shadow-2xl"
                />
              </motion.div>
              {/* Decorative background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="how-it-works" className="bg-white py-24 md:py-32 border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-secondary-text mb-6">
              <AlertTriangle className="w-3 h-3 text-orange-400" /> THE PROBLEM
            </div>
            <h2 className="text-4xl md:text-7xl text-dark mb-8 font-extrabold">Hiring interns shouldn't feel <br className="hidden md:block" /> like a gamble.</h2>
            <p className="text-lg text-secondary-text max-w-2xl mx-auto">Companies waste time and resources on unverified candidates. Here's what they face:</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <ProblemCard 
              title="Students exaggerate their skills" 
              description="CVs don't tell you if they can actually code. You spend weeks filtering through noise."
              iconColor="bg-red-50 text-red-500"
            />
            <ProblemCard 
              title="You get mismatched candidates" 
              description="Interviews waste hours on people who aren't a fit for your specific tech stack or culture."
              iconColor="bg-orange-50 text-orange-500"
            />
            <ProblemCard 
              title="Assessment is fragmented" 
              description="No standard way to evaluate intern-level talent across different universities and backgrounds."
              iconColor="bg-yellow-50 text-yellow-500"
            />
          </div>

          <p className="text-center italic text-secondary-text text-xl font-medium">"We're building a better way."</p>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="bg-[#0a0a0a] py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="inline-block bg-white/5 text-white/40 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              ⚡ WHAT YOU GET
            </div>
            <h2 className="text-4xl md:text-8xl text-white mb-8 font-extrabold">Everything you need. <br /> Nothing you don't.</h2>
            <p className="text-white/40 text-xl max-w-3xl mx-auto">Comprehensive solutions tailored to connect companies with the right intern talent.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard 
              title="Smart Matching"
              description="Our algorithm finds students who actually match your requirements — based on verified test scores, not guesses."
              badge="Intelligent Pairing"
            />
            <FeatureCard 
              title="Verified Skills"
              description="Every student takes coding tests before you see them. No more 'I know Python' — you see their actual level."
              badge="Skill Validation"
            />
            <FeatureCard 
              title="Progress Tracking"
              description="Monitor intern growth in real time. See what they're learning week by week — not just a final report."
              badge="Real-time Insights"
            />
            <FeatureCard 
              title="Flexible Tiers"
              description="Choose your level: High-performance, Development, or Foundational. We match you with students at your pace."
              badge="Custom Fit"
            />
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-white py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-accent mb-6">
              🔄 HOW IT WORKS
            </div>
            <h2 className="text-4xl md:text-7xl text-dark mb-8 font-extrabold">Simplify your workflow</h2>
            <p className="text-xl text-secondary-text">Three simple steps to find your perfect intern match.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { step: "01", title: "Sign up for free", desc: "Create your company profile and tell us what kind of interns you need." },
              { step: "02", title: "We match you", desc: "Our algorithm pairs you with verified LASU CS students based on real coding assessments." },
              { step: "03", title: "Start working together", desc: "Review matched profiles, interview shortlisted candidates, and onboard your new intern." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-accent font-bold text-xl mb-6">{item.step}</div>
                <h3 className="text-2xl font-bold text-dark mb-4">{item.title}</h3>
                <p className="text-secondary-text leading-relaxed text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Companies Section */}
      <section id="for-companies" className="bg-[#f8fafc] py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-white border border-gray-100 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-secondary-text mb-8 shadow-sm">
                🏢 FOR COMPANIES
              </div>
              <h2 className="text-4xl md:text-7xl text-dark mb-8 font-extrabold leading-tight">Designed for companies like yours.</h2>
              <p className="text-xl text-secondary-text mb-10 leading-relaxed">
                Whether you're a fintech startup or an established bank, we help you find verified interns — fast.
              </p>
              <button className="bg-dark text-white px-10 py-5 rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95">
                Join the Waitlist
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[40px] shadow-xl shadow-blue-900/5 border border-gray-50"
            >
              <ul className="space-y-8">
                {[
                  "Save interview time — see verified skills first",
                  "Reduce mismatches — get candidates who actually fit",
                  "Build talent pipeline — identify future hires early",
                  "Low commitment — start with our free waitlist"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-5">
                    <div className="mt-1 w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <Star className="text-accent w-5 h-5 fill-accent" />
                    </div>
                    <span className="text-xl text-dark font-semibold">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 pt-10 border-t border-gray-100">
                <p className="italic text-secondary-text text-lg">
                  "Whether you need senior-level interns or are happy to train, we have a tier for you."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="bg-white py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-pink-500 mb-8">
            🎯 WHO IT'S FOR
          </div>
          <h2 className="text-4xl md:text-8xl text-dark mb-10 font-extrabold">Perfect for any Lagos-based company hiring tech talent.</h2>
          <p className="text-xl text-secondary-text max-w-3xl mx-auto mb-16">From startups to enterprises — if you need tech talent in Lagos, we've got you covered.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Zap, label: "Fintech" },
              { icon: Laptop, label: "Tech Startups" },
              { icon: Building2, label: "Banks" },
              { icon: ShoppingCart, label: "E-commerce" },
              { icon: ClipboardList, label: "Consulting" },
              { icon: Gavel, label: "Government" },
              { icon: Factory, label: "Manufacturing" },
              { icon: HeartPulse, label: "Healthcare" }
            ].map((tag, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }}
                className="bg-gray-50 border border-gray-100 px-8 py-4 rounded-3xl flex items-center gap-4 transition-all cursor-default"
              >
                <tag.icon className="w-5 h-5 text-secondary-text" />
                <span className="font-bold text-dark">{tag.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-24 md:py-40 border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-600 mb-8">
              📊 PROOF IN THE NUMBERS
            </div>
            <h2 className="text-4xl md:text-8xl text-dark mb-10 font-extrabold">Built to scale, <br /> proven to perform.</h2>
            <p className="text-xl text-secondary-text max-w-2xl mx-auto">Behind every number is a student matched and a company satisfied.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StatCard 
              number="200+" 
              label="Students Pre-enrolled" 
              description="Verified CS students from LASU ready to work."
            />
            <StatCard 
              number="40+" 
              label="Companies on Waitlist" 
              description="Lagos companies already signed up."
            />
            <StatCard 
              number="100%" 
              label="Skills Verified" 
              description="Every student tested before matching."
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#0a0a0a] py-32 md:py-56 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-accent/10 blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-9xl text-white mb-12 font-extrabold leading-tight"
          >
            Ready to find your <br /> next great intern?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/40 mb-16 leading-relaxed max-w-3xl mx-auto"
          >
            Be among the first companies to access verified Computer Science talent from LASU. Join free — no commitment needed.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button className="bg-white text-dark px-12 py-6 rounded-full font-bold text-2xl transition-transform hover:scale-105 active:scale-95 mb-8 shadow-2xl shadow-white/10">
              Join the Waitlist — It's Free →
            </button>
            <p className="text-white/20 text-sm font-medium">No credit card required. Cancel anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-24">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <img src={LOGO_2D} alt="Logo" className="w-10 h-10 rounded-xl" />
                <span className="text-2xl font-bold text-white tracking-tight">MatchTrack</span>
              </div>
              <p className="text-white/30 text-lg max-w-md leading-relaxed">
                Smarter internships. Verified talent. <br />
                Connecting the best of LASU to the heart of Lagos tech.
              </p>
            </div>

            <div className="flex flex-wrap gap-12 md:gap-20">
              <div className="flex gap-12">
                {['About', 'Features', 'For Companies', 'Contact'].map((item) => (
                  <a key={item} href="#" className="text-white/40 hover:text-white transition-colors font-medium">{item}</a>
                ))}
              </div>
              <div className="flex gap-8">
                {['Twitter/X', 'LinkedIn', 'Instagram'].map((item) => (
                  <a key={item} href="#" className="text-white/40 hover:text-white transition-colors font-medium">{item}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-16 border-t border-white/5 text-center text-white/10 text-sm font-medium">
            © 2025 LASU Internship MatchTrack. Built in Lagos, Nigeria.
          </div>
        </div>
      </footer>
    </div>
  );
}
