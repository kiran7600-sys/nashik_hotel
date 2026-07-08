"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { menuHighlights, type Dish } from "@/lib/content";

const cuisines = ["Indian", "Continental", "Chinese"] as const;

export default function MenuHighlights() {
  const [activeCuisine, setActiveCuisine] = useState<(typeof cuisines)[number]>("Indian");

  const filteredDishes = menuHighlights.filter(
    (dish) => dish.cuisine === activeCuisine
  );

  return (
    <section id="menu" className="bg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Menu Highlights"
            subtitle="A curated selection from our kitchen — where seasonal ingredients meet culinary craft"
          />
        </ScrollReveal>

        {/* Cuisine tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center justify-center gap-2 mb-12">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setActiveCuisine(cuisine)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCuisine === cuisine
                    ? "bg-forest text-cream shadow-lg"
                    : "bg-offwhite text-espresso/70 hover:bg-sage/10 border border-sage/20"
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Dishes grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCuisine}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredDishes.map((dish, i) => (
              <DishCard key={dish.id} dish={dish} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View Full Menu CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12 md:mt-16">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-terracotta text-offwhite font-medium hover:bg-terracotta/90 transition-all duration-300 text-sm tracking-wider uppercase shadow-lg shadow-terracotta/20"
            >
              View Full Menu
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function DishCard({ dish, index }: { dish: Dish; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass-card rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-500"
    >
      {/* Dish image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Cuisine badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-forest/80 backdrop-blur-sm text-cream text-xs tracking-wider uppercase">
          {dish.cuisine}
        </div>
      </div>

      {/* Dish info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-heading text-lg font-semibold text-forest leading-snug">
            {dish.name}
          </h3>
          <span className="text-terracotta font-heading text-lg font-semibold shrink-0">
            ₹{dish.price}
          </span>
        </div>
        <p className="text-espresso/60 text-sm leading-relaxed">
          {dish.description}
        </p>
      </div>
    </motion.div>
  );
}
