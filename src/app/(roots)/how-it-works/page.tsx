"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "1. Browse & Find Your Dream Vehicle",
    desc: "Explore thousands of verified listings from trusted sellers and dealers. Use filters to find exactly what fits your budget, condition, and location.",
    icon: "🚗",
  },
  {
    id: 2,
    title: "2. Register & Get Verified",
    desc: "Create your free account to unlock bidding access. Verified members can bid, buy now, and track their favorite vehicles in one dashboard.",
    icon: "✅",
  },
  {
    id: 3,
    title: "3. Place Your Bid or Buy Instantly",
    desc: "Bid in real-time with complete transparency or use the Buy Now option for instant purchase. Every bid is secure, fast, and fair.",
    icon: "⚡",
  },
  {
    id: 4,
    title: "4. Complete Payment Securely",
    desc: "Once you win, complete your payment through our trusted payment partners. We support both local and international transactions.",
    icon: "💳",
  },
  {
    id: 5,
    title: "5. Schedule Pickup or Delivery",
    desc: "We’ll help coordinate pickup or door-to-door delivery. Our logistics team ensures your vehicle arrives safely and on time.",
    icon: "🚚",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),_transparent)]" />
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            How It Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg text-blue-100"
          >
            From registration to delivery — discover how our transparent and
            secure auction process puts you in control every step of the way.
          </motion.p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 mb-8">
            Join thousands of members who trust our platform for transparent,
            secure, and rewarding vehicle auctions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition">
              Create Free Account
            </button>
            <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition">
              Explore Live Auctions
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
