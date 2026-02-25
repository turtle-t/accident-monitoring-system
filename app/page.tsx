// app/page.tsx
"use client";

import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import HowItWorks from "../components/HowItWorks";
import PreviewGrid from "../components/PreviewGrid";
import TeamCard from "../components/TeamCard";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <>
      <Hero />

      {/* Core Features */}
      <section className="mt-12 px-6 lg:px-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Core Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Accident Detection"
            desc="Real-time detection using impact sensors and accelerometer data."
            icon="⚡"
          />

          <FeatureCard
            title="Alcohol Monitoring"
            desc="Alcohol sensor (MQ-3) integration to detect intoxicated driving."
            icon="🍷"
          />

          <FeatureCard
            title="Seatbelt Check"
            desc="Seatbelt status monitoring and alerts if not fastened."
            icon="🔒"
          />

          <FeatureCard
            title="Live Dashboard"
            desc="Instant dashboard and alerts — built with Next.js and Tailwind."
            icon="📊"
          />

          <FeatureCard
            title="Live GPS Tracking"
            desc="Real-time vehicle tracking with cloud-synced location updates."
            icon="🛰"
          />

          <FeatureCard
            title="Geo-Fencing"
            desc="Define safe driving zones and trigger alerts when the vehicle exits boundaries."
            icon="📍"
          />

          <FeatureCard
            title="Emergency SMS Alert"
            desc="Automatic SMS with live location sent to emergency contacts during accidents."
            icon="📩"
          />
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Preview Section */}
      <section className="mt-16 px-6 lg:px-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          System Preview
        </h2>
        <PreviewGrid />
      </section>

      {/* Team Section */}
      <section className="mt-16 px-6 lg:px-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Meet The Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <TeamCard
            name="Trilok"
            role="Hardware & System"
            img="/team/trilok.jpeg"
          />
          <TeamCard
            name="Aditya"
            role="Frontend & API"
            img="/team/aditya.jpeg"
          />
          <TeamCard
            name="Ayush"
            role="Embedded & Circuits"
            img="/team/ayush.jpeg"
          />
          <TeamCard
            name="Prashant"
            role="Docs & Demo"
            img="/team/prashant.jpeg"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}