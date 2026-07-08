"use client";
import React, { useState } from "react";
import Image from "next/image";

const MENU_DATA = {
  Signature: [
    { 
      name: "Terotale Veg Sizzler", 
      desc: "House-made cottage cheese steaks, smoky brown reduction, fire-roasted greens.", 
      price: "₹625", 
      image: "/images/dish-paneer-tikka.png",
      tags: ["Chef Special", "Smoky"] 
    },
    { 
      name: "Artisanal Bruschetta", 
      desc: "Charred sourdough, heirloom tomatoes, dynamic herb extracts, virgin olive press.", 
      price: "₹385", 
      image: "/images/dish-bruschetta.png",
      tags: ["Jain Available", "Vegan"] 
    }
  ],
  Mains: [
    { 
      name: "Subz Dal Makhani", 
      desc: "Slow-simmered black lentils over charcoal for 24 hours, enriched with organic butter.", 
      price: "₹425", 
      image: "/images/dish-dal-makhani.png",
      tags: ["Classic Indian"] 
    },
    { 
      name: "Thai Green Curry", 
      desc: "Exotic garden vegetables simmered in a fragrant coconut and lemongrass broth.", 
      price: "₹495", 
      image: "/images/dish-thai-curry.png",
      tags: ["Jain Available", "Spicy"] 
    }
  ]
};

type MenuCategory = keyof typeof MENU_DATA;

export default function MenuHighlights() {
  const [activeTab, setActiveTab] = useState<MenuCategory>("Signature");

  return (
    <section id="menu" className="py-32 bg-[#FAF9F6] px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] mb-4 block font-semibold">Curated Flavors</span>
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900">The Culinary Collection</h2>
        </div>

        {/* Categories Tab Navigation Bar */}
        <div className="flex justify-center border-b border-stone-300 mb-16 gap-12 overflow-x-auto pb-4">
          {(Object.keys(MENU_DATA) as MenuCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`text-sm uppercase tracking-widest font-semibold transition-all cursor-pointer relative ${
                activeTab === category 
                  ? "text-stone-900 after:content-[''] after:absolute after:-bottom-[17px] after:left-0 after:w-full after:h-[2px] after:bg-[#C5A880]" 
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Content Render Grid */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
          {MENU_DATA[activeTab].map((item, index) => (
            <div key={index} className="group flex flex-col sm:flex-row gap-8 items-start border-b border-stone-200 pb-8">
              {/* Dish Image */}
              <div className="w-full sm:w-40 h-40 relative overflow-hidden rounded-sm flex-shrink-0">
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  sizes="(max-width: 640px) 100vw, 160px"
                />
              </div>
              
              {/* Dish Details */}
              <div className="flex flex-col flex-grow justify-center h-full">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-2xl font-serif text-stone-900 group-hover:text-[#C5A880] transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-lg font-serif text-stone-900 ml-4">{item.price}</span>
                </div>
                <p className="text-stone-500 font-light text-sm leading-relaxed mb-4 pr-4">
                  {item.desc}
                </p>
                <div className="flex gap-3">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white border border-stone-200 text-stone-500 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
