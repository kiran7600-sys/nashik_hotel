"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteInfo, visitInfo } from "@/lib/content";

export default function VisitUs() {
  return (
    <section id="visit" className="bg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title={visitInfo.heading}
            subtitle="We'd love to welcome you. Here's how to find us."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Info column */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0 mt-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-forest mb-1">
                    Address
                  </h3>
                  <p className="text-espresso/70 text-sm leading-relaxed">
                    {siteInfo.address.full}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${siteInfo.coordinates.lat},${siteInfo.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-terracotta text-sm font-medium mt-2 hover:underline"
                  >
                    Get Directions
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Directions note */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0 mt-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage">
                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-forest mb-1">
                    How to Find Us
                  </h3>
                  <p className="text-espresso/70 text-sm leading-relaxed">
                    {visitInfo.directions}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0 mt-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-forest mb-1">
                    Opening Hours
                  </h3>
                  <div className="space-y-1">
                    {siteInfo.hours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-4 text-sm">
                        <span className="text-espresso/70">{h.day}</span>
                        <span className="text-espresso font-medium">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Parking & EV */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0 mt-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage">
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                    <path d="M12 17v-2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-forest mb-1">
                    Parking & EV Charging
                  </h3>
                  <p className="text-espresso/70 text-sm leading-relaxed">
                    {visitInfo.parking}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0 mt-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-forest mb-1">
                    Call Us
                  </h3>
                  <a
                    href={`tel:${siteInfo.phone.replace(/\s/g, "")}`}
                    className="text-terracotta text-sm font-medium hover:underline"
                  >
                    {siteInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Map column */}
          <ScrollReveal delay={0.25}>
            <div className="relative rounded-xl overflow-hidden shadow-lg h-[400px] lg:h-full min-h-[400px]">
              <iframe
                src={siteInfo.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Terotale location on Google Maps"
                className="absolute inset-0"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
