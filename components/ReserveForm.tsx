"use client";

import { useState, type FormEvent } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { reserveConfig, siteInfo } from "@/lib/content";

export default function ReserveForm() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string>(reserveConfig.timeSlots[5]); // default 7:00 PM
  const [partySize, setPartySize] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  // Minimum date = today
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Format date for readability
    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const message = reserveConfig.messageTemplate(name, formattedDate, time, partySize);
    const whatsappUrl = `https://wa.me/${siteInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;

    setSubmitted(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Reset after brief delay
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="reserve" className="bg-[#1C1A17] py-24 md:py-32 border-t border-stone-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] mb-2 block font-medium">Reservations</span>
            <SectionHeading
              title={reserveConfig.heading}
              subtitle={reserveConfig.subheading}
              light={true}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="bg-stone-900/60 border border-stone-850 rounded-2xl p-6 md:p-10 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label
                  htmlFor="reserve-name"
                  className="block text-xs uppercase tracking-[0.2em] font-semibold text-stone-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  id="reserve-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-3 rounded-lg border border-stone-700 bg-stone-900 text-[#FAF9F6] placeholder:text-stone-600 focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/30 outline-none transition-all"
                />
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="reserve-date"
                  className="block text-xs uppercase tracking-[0.2em] font-semibold text-stone-300 mb-2"
                >
                  Date
                </label>
                <input
                  id="reserve-date"
                  type="date"
                  required
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-stone-700 bg-stone-900 text-[#FAF9F6] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/30 outline-none transition-all"
                />
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="reserve-time"
                  className="block text-xs uppercase tracking-[0.2em] font-semibold text-stone-300 mb-2"
                >
                  Preferred Time
                </label>
                <select
                  id="reserve-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-stone-700 bg-stone-900 text-[#FAF9F6] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/30 outline-none transition-all appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C5A880' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  {reserveConfig.timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Party Size */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-stone-300 mb-3">
                  Party Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {reserveConfig.partySizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPartySize(size)}
                      className={`w-12 h-12 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                        partySize === size
                          ? "bg-[#C5A880] text-stone-900 shadow-md"
                          : "bg-stone-900 text-stone-300 border border-stone-700 hover:border-stone-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitted}
              className={`mt-8 w-full py-4 rounded-lg font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                submitted
                  ? "bg-stone-800 text-stone-400 cursor-not-allowed"
                  : "bg-[#C5A880] text-stone-900 hover:bg-[#B3966E] shadow-lg shadow-[#C5A880]/10"
              }`}
            >
              {submitted ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Opening WhatsApp...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Reserve on WhatsApp
                </>
              )}
            </button>

            <p className="text-center text-stone-500 text-xs mt-4">
              Your reservation request will be sent via WhatsApp. No account needed.
            </p>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
