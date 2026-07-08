"use client";
import React, { useState } from "react";

const MENU_DATA = {
  Signature: [
    { name: "Artisanal Bruschetta", desc: "Charred sourdough, heirloom tomatoes, dynamic herb extracts, virgin olive press", price: "₹385", tags: ["Chef Special", "Jain Available"] },
    { name: "Terotale Fusion Sizzler", desc: "House-made cottage cheese steaks, smoky brown reduction, fire-roasted greens", price: "₹625", tags: ["Signature"] }
  ],
  Continental: [
    { name: "Handmade Truffle Pasta", desc: "Fresh fettuccine tossed in a rich wild mushroom cream and black truffle aroma", price: "₹545", tags: ["Premium"] },
    { name: "Woodfired Garden Pizza", desc: "Slow-fermented dough, house pomodoro, garden-picked basil, fresh mozzarella", price: "₹495", tags: ["Jain Available"] }
  ],
  Indian: [
    { name: "Subz Dal Makhani", desc: "Slow-simmered black lentils over charcoal for 24 hours, enriched with organic butter", price: "₹425", tags: ["Classic"] }
  ]
};

type MenuCategory = keyof typeof MENU_DATA;

export default function MenuHighlights() {
  const [activeTab, setActiveTab] = useState<MenuCategory>("Signature");

  return (
    <section id="menu" className="py-24 bg-[#FAF9F6] px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] mb-2 block font-medium">Curated Flavors</span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900">The Culinary Collection</h2>
        </div>

        {/* Categories Tab Navigation Bar */}
        <div className="flex justify-center border-b border-stone-200 mb-16 gap-8 overflow-x-auto pb-2">
          {(Object.keys(MENU_DATA) as MenuCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`text-xs uppercase tracking-widest font-semibold pb-4 transition-all cursor-pointer relative ${
                activeTab === category ? "text-stone-900 border-b-2 border-[#C5A880]" : "text-stone-400 hover:text-stone-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Content Render Grid */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {MENU_DATA[activeTab].map((item, index) => (
            <div key={index} className="group border-b border-stone-100 pb-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-serif text-stone-900 group-hover:text-[#C5A880] transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-sm font-medium tracking-wider text-stone-600 pl-4">{item.price}</span>
                </div>
                <p className="text-stone-500 font-light text-sm leading-relaxed mb-3">
                  {item.desc}
                </p>
              </div>
              <div className="flex gap-2">
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-stone-100 text-stone-600 border border-stone-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
